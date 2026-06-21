import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

interface Props {
    token: string;
    questionsCount: number;
}

function getRules(questionsCount: number) {
    return [
        'Answer every question carefully — you cannot go back to a previous question.',
        `You have ${questionsCount} minutes total for the entire quiz — answer as fast as you like.`,
        'Each question has 4 options — select the best answer.',
        'Your quiz starts as soon as you click "Start Quiz".',
        'When the total timer expires, unanswered questions are marked incorrect.',
        'You cannot retake the quiz after starting.',
    ];
}

export default function Waiting({ token, questionsCount }: Props) {
    const [dots, setDots] = useState('');
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

    // Animate loading dots
    useEffect(() => {
        const id = setInterval(() => {
            setDots(d => (d.length >= 3 ? '' : d + '.'));
        }, 500);
        return () => clearInterval(id);
    }, []);

    // Elapsed seconds counter
    useEffect(() => {
        const id = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(id);
    }, []);

    // Poll status every 3 seconds
    useEffect(() => {
        const poll = async () => {
            try {
                const res = await fetch(`/quiz/${token}/status`, {
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) return;
                const data = await res.json();
                if (data.status === 'ready') {
                    router.visit(`/quiz/${token}`);
                } else if (data.status === 'failed' || data.status === 'expired') {
                    router.visit(`/quiz/${token}`);
                }
            } catch {
                // silently retry
            }
        };

        intervalRef.current = setInterval(poll, 3000);
        // Immediate first poll
        poll();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [token]);

    return (
        <div className="quiz-waiting-root">
            <div className="quiz-waiting-bg" />

            {/* Main card */}
            <div className="quiz-waiting-card">
                {/* Animated spinner */}
                <div className="quiz-spinner-wrapper">
                    <div className="quiz-spinner-ring quiz-spinner-ring--outer" />
                    <div className="quiz-spinner-ring quiz-spinner-ring--inner" />
                    <div className="quiz-spinner-icon">🤖</div>
                </div>

                <h1 className="quiz-waiting-title">
                    Analysing Your CV{dots}
                </h1>
                <p className="quiz-waiting-subtitle">
                    Our AI is reviewing your resume and crafting{' '}
                    <strong>{questionsCount} personalised questions</strong> just for you.
                    This usually takes 30–60 seconds.
                </p>

                {/* Progress bar */}
                <div className="quiz-progress-track">
                    <div
                        className="quiz-progress-fill"
                        style={{ width: `${Math.min((elapsed / 60) * 100, 95)}%` }}
                    />
                </div>
                <p className="quiz-waiting-timer">{elapsed}s elapsed</p>

                {/* Divider */}
                <div className="quiz-divider" />

                {/* Rules */}
                <h2 className="quiz-rules-title">📋 Quiz Rules</h2>
                <ul className="quiz-rules-list">
                    {getRules(questionsCount).map((rule, i) => (
                        <li key={i} className="quiz-rule-item">
                            <span className="quiz-rule-number">{i + 1}</span>
                            <span>{rule}</span>
                        </li>
                    ))}
                </ul>

                <p className="quiz-waiting-note">
                    This page will automatically redirect when your quiz is ready. Do not close this tab.
                </p>
            </div>

            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .quiz-waiting-root {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 1rem;
                    background: #0a0a14;
                    font-family: 'Inter', system-ui, sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                .quiz-waiting-bg {
                    position: fixed;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.35) 0%, transparent 70%),
                        radial-gradient(ellipse 50% 30% at 80% 80%, rgba(168,85,247,0.25) 0%, transparent 60%);
                    pointer-events: none;
                    z-index: 0;
                }

                .quiz-waiting-card {
                    position: relative;
                    z-index: 1;
                    background: rgba(15, 15, 30, 0.85);
                    border: 1px solid rgba(99,102,241,0.3);
                    backdrop-filter: blur(24px);
                    border-radius: 24px;
                    padding: 3rem 2.5rem;
                    max-width: 640px;
                    width: 100%;
                    box-shadow: 0 0 60px rgba(99,102,241,0.15), 0 20px 60px rgba(0,0,0,0.5);
                    animation: fadeUp 0.6s ease both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Spinner */
                .quiz-spinner-wrapper {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 2rem;
                }

                .quiz-spinner-ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 3px solid transparent;
                }

                .quiz-spinner-ring--outer {
                    border-top-color: #818cf8;
                    border-right-color: #818cf8;
                    animation: spin 1.2s linear infinite;
                }

                .quiz-spinner-ring--inner {
                    inset: 10px;
                    border-bottom-color: #a78bfa;
                    border-left-color: #a78bfa;
                    animation: spin 0.8s linear infinite reverse;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .quiz-spinner-icon {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                }

                .quiz-waiting-title {
                    text-align: center;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #e2e8f0;
                    margin-bottom: 0.75rem;
                    letter-spacing: -0.02em;
                    min-height: 2.4rem;
                }

                .quiz-waiting-subtitle {
                    text-align: center;
                    color: #94a3b8;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .quiz-waiting-subtitle strong {
                    color: #818cf8;
                }

                /* Progress bar */
                .quiz-progress-track {
                    background: rgba(255,255,255,0.08);
                    border-radius: 100px;
                    height: 6px;
                    overflow: hidden;
                    margin-bottom: 0.5rem;
                }

                .quiz-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #6366f1, #a78bfa);
                    border-radius: 100px;
                    transition: width 1s ease;
                }

                .quiz-waiting-timer {
                    text-align: center;
                    font-size: 0.78rem;
                    color: #64748b;
                    margin-bottom: 0;
                }

                /* Divider */
                .quiz-divider {
                    border: none;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    margin: 2rem 0;
                }

                /* Rules */
                .quiz-rules-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #cbd5e1;
                    margin-bottom: 1rem;
                    letter-spacing: 0.02em;
                }

                .quiz-rules-list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }

                .quiz-rule-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    color: #94a3b8;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }

                .quiz-rule-number {
                    flex-shrink: 0;
                    width: 22px;
                    height: 22px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    font-weight: 700;
                    color: #fff;
                    margin-top: 1px;
                }

                .quiz-waiting-note {
                    text-align: center;
                    font-size: 0.78rem;
                    color: #475569;
                    line-height: 1.5;
                    padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.03);
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.06);
                }

                @media (max-width: 480px) {
                    .quiz-waiting-card { padding: 2rem 1.25rem; }
                    .quiz-waiting-title { font-size: 1.4rem; }
                }
            `}</style>
        </div>
    );
}
