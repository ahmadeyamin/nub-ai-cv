import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

interface QuestionData {
    id: number;
    number: number;
    text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
}

interface Props {
    token: string;
    question: QuestionData;
    totalQuestions: number;
    expiresAt: string | null;
    answeredCount: number;
}

const OPTIONS = ['a', 'b', 'c', 'd'] as const;
const OPTION_LABELS: Record<string, string> = { a: 'A', b: 'B', c: 'C', d: 'D' };

function getOptionText(question: QuestionData, opt: string): string {
    return question[`option_${opt}` as keyof QuestionData] as string;
}

function useCountdown(expiresAt: string | null) {
    const [secondsLeft, setSecondsLeft] = useState<number>(() => {
        if (!expiresAt) return 0;
        return Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
    });

    useEffect(() => {
        if (!expiresAt) return;
        const id = setInterval(() => {
            const remaining = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
            setSecondsLeft(remaining);
        }, 500);
        return () => clearInterval(id);
    }, [expiresAt]);

    return secondsLeft;
}

export default function Question({ token, question, totalQuestions, expiresAt, answeredCount }: Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const secondsLeft = useCountdown(expiresAt);
    const { data, setData, post, processing } = useForm({
        question_id: question.id,
        selected_option: '',
    });
    const autoSubmitRef = useRef(false);

    // ── KEY FIX: Reset state when question changes ──────────────────────────
    // Inertia reuses the same component instance between navigations, so
    // useState does NOT auto-reset. We must do it manually.
    useLayoutEffect(() => {
        setSelected(null);
        setData({
            question_id: question.id,
            selected_option: '',
        });
        autoSubmitRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    // Auto-submit when timer hits 0
    useEffect(() => {
        if (secondsLeft === 0 && !autoSubmitRef.current && !processing) {
            autoSubmitRef.current = true;
            const currentSelected = selected;
            setData('selected_option', currentSelected ?? 'a');
            setTimeout(() => {
                post(`/quiz/${token}/answer`);
            }, 150);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondsLeft]);

    function handleSelect(opt: string) {
        setSelected(opt);
        setData('selected_option', opt);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selected || processing) return;
        post(`/quiz/${token}/answer`);
    }

    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const totalSecs = expiresAt ? Math.floor((new Date(expiresAt).getTime() - (new Date(expiresAt).getTime() - (answeredCount === 0 ? totalQuestions * 60 : (totalQuestions - answeredCount) * 60) * 1000)) / 1000) : totalQuestions * 60;
    const progress = ((question.number - 1) / totalQuestions) * 100;
    const timerPct = expiresAt ? Math.max(0, (secondsLeft / (totalQuestions * 60)) * 100) : 100;
    const timerDanger = secondsLeft <= 60;

    return (
        <div className="qq-root">
            <div className="qq-bg" />

            <div className="qq-wrapper">
                {/* Top bar */}
                <div className="qq-topbar">
                    <div className="qq-progress-info">
                        <span className="qq-q-label">Question {question.number} of {totalQuestions}</span>
                        <span className="qq-q-answered">{answeredCount} answered</span>
                    </div>
                    <div className={`qq-timer ${timerDanger ? 'qq-timer--danger' : ''}`}>
                        <span className="qq-timer-icon">{timerDanger ? '⚠️' : '⏱️'}</span>
                        <span className="qq-timer-value">{timerStr}</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="qq-progress-track">
                    <div className="qq-progress-fill" style={{ width: `${progress}%` }} />
                    <div
                        className={`qq-timer-fill ${timerDanger ? 'qq-timer-fill--danger' : ''}`}
                        style={{ width: `${timerPct}%` }}
                    />
                </div>

                {/* Question card */}
                <div className="qq-card">
                    <div className="qq-q-number-badge">Q{question.number}</div>
                    <p className="qq-q-text">{question.text}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="qq-options">
                            {OPTIONS.map(opt => {
                                const isSelected = selected === opt;
                                return (
                                    <button
                                        key={opt}
                                        type="button"
                                        className={`qq-option ${isSelected ? 'qq-option--selected' : ''}`}
                                        onClick={() => handleSelect(opt)}
                                        disabled={processing}
                                        id={`quiz-option-${opt}`}
                                    >
                                        <span className={`qq-opt-label ${isSelected ? 'qq-opt-label--selected' : ''}`}>
                                            {OPTION_LABELS[opt]}
                                        </span>
                                        <span className="qq-opt-text">{getOptionText(question, opt)}</span>
                                        {isSelected && <span className="qq-opt-check">✓</span>}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="submit"
                            className="qq-submit-btn"
                            disabled={!selected || processing}
                            id="quiz-submit-answer-btn"
                        >
                            {processing ? (
                                <><span className="qq-btn-spinner" /> Submitting…</>
                            ) : question.number === totalQuestions ? (
                                '🏁 Submit Final Answer'
                            ) : (
                                '→ Next Question'
                            )}
                        </button>
                    </form>
                </div>

                {/* Timer expired overlay */}
                {secondsLeft === 0 && (
                    <div className="qq-expired-overlay">
                        <div className="qq-expired-card">
                            <span style={{ fontSize: '2.5rem' }}>⏰</span>
                            <h2>Time's Up!</h2>
                            <p>Submitting your quiz…</p>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .qq-root {
                    min-height: 100vh;
                    background: #0a0a14;
                    font-family: 'Inter', system-ui, sans-serif;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }

                .qq-bg {
                    position: fixed;
                    inset: 0;
                    background: radial-gradient(ellipse 70% 40% at 70% 0%, rgba(99,102,241,0.2) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                }

                .qq-wrapper {
                    position: relative;
                    z-index: 1;
                    max-width: 720px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 1.5rem 1rem 3rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                /* Top bar */
                .qq-topbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 0 0.75rem;
                }

                .qq-progress-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .qq-q-label {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #e2e8f0;
                }

                .qq-q-answered {
                    font-size: 0.75rem;
                    color: #64748b;
                }

                .qq-timer {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 100px;
                    padding: 0.4rem 0.875rem;
                    transition: all 0.3s;
                }

                .qq-timer--danger {
                    background: rgba(239,68,68,0.15);
                    border-color: rgba(239,68,68,0.4);
                    animation: pulse 1s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
                    50% { box-shadow: 0 0 0 6px rgba(239,68,68,0.15); }
                }

                .qq-timer-icon { font-size: 0.9rem; }

                .qq-timer-value {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #f1f5f9;
                    font-variant-numeric: tabular-nums;
                }

                .qq-timer--danger .qq-timer-value { color: #f87171; }

                /* Progress tracks */
                .qq-progress-track {
                    display: flex;
                    height: 4px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 100px;
                    overflow: hidden;
                    margin-bottom: 1.5rem;
                    gap: 2px;
                }

                .qq-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                    border-radius: 100px;
                    transition: width 0.5s ease;
                    flex-shrink: 0;
                }

                .qq-timer-fill {
                    height: 100%;
                    background: rgba(99,102,241,0.25);
                    border-radius: 100px;
                    transition: width 0.5s linear, background 0.5s;
                    flex-shrink: 0;
                }

                .qq-timer-fill--danger {
                    background: rgba(239,68,68,0.4);
                }

                /* Question card */
                .qq-card {
                    background: rgba(15,15,30,0.9);
                    border: 1px solid rgba(99,102,241,0.2);
                    border-radius: 20px;
                    padding: 2rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                    animation: fadeUp 0.4s ease both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .qq-q-number-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: #fff;
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 0.25rem 0.625rem;
                    border-radius: 100px;
                    margin-bottom: 1rem;
                    letter-spacing: 0.05em;
                }

                .qq-q-text {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #f1f5f9;
                    line-height: 1.6;
                    margin-bottom: 1.75rem;
                }

                /* Options */
                .qq-options {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .qq-option {
                    display: flex;
                    align-items: center;
                    gap: 0.875rem;
                    padding: 1rem 1.25rem;
                    background: rgba(255,255,255,0.04);
                    border: 1.5px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.15s;
                    width: 100%;
                }

                .qq-option:hover:not(:disabled) {
                    background: rgba(99,102,241,0.1);
                    border-color: rgba(99,102,241,0.4);
                    transform: translateX(2px);
                }

                .qq-option--selected {
                    background: rgba(99,102,241,0.15) !important;
                    border-color: #6366f1 !important;
                    box-shadow: 0 0 0 1px rgba(99,102,241,0.4);
                }

                .qq-opt-label {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 800;
                    background: rgba(255,255,255,0.06);
                    color: #94a3b8;
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.15s;
                }

                .qq-opt-label--selected {
                    background: #6366f1;
                    color: #fff;
                    border-color: #6366f1;
                }

                .qq-opt-text {
                    flex: 1;
                    font-size: 0.9rem;
                    color: #cbd5e1;
                    line-height: 1.4;
                }

                .qq-option--selected .qq-opt-text { color: #e2e8f0; }

                .qq-opt-check {
                    color: #818cf8;
                    font-weight: 700;
                    font-size: 1rem;
                }

                /* Submit button */
                .qq-submit-btn {
                    width: 100%;
                    padding: 0.875rem;
                    background: linear-gradient(135deg, #4f46e5, #6366f1, #818cf8);
                    border: none;
                    border-radius: 10px;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    letter-spacing: -0.01em;
                    transition: opacity 0.2s, transform 0.15s;
                    box-shadow: 0 4px 16px rgba(99,102,241,0.4);
                }

                .qq-submit-btn:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }

                .qq-submit-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                    transform: none;
                }

                .qq-btn-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    display: inline-block;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                /* Expired overlay */
                .qq-expired-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    backdrop-filter: blur(8px);
                }

                .qq-expired-card {
                    background: rgba(15,15,30,0.95);
                    border: 1px solid rgba(239,68,68,0.4);
                    border-radius: 20px;
                    padding: 3rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                    box-shadow: 0 0 60px rgba(239,68,68,0.2);
                }

                .qq-expired-card h2 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #f87171;
                }

                .qq-expired-card p {
                    color: #94a3b8;
                    font-size: 0.9rem;
                }

                @media (max-width: 480px) {
                    .qq-card { padding: 1.5rem 1.25rem; }
                    .qq-q-text { font-size: 1rem; }
                }
            `}</style>
        </div>
    );
}
