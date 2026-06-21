interface QuestionResult {
    number: number;
    text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    selected_option: string | null;
    is_correct: boolean;
}

interface Props {
    token: string;
    candidateName: string;
    jobTitle: string;
    score: number;
    passed: boolean;
    totalQuestions: number;
    correctCount: number;
    questions: QuestionResult[];
    timeTaken: number | null;
}

function getOptionText(q: QuestionResult, opt: string): string {
    return q[`option_${opt}` as keyof QuestionResult] as string;
}

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}

function CircleScore({ score, passed }: { score: number; passed: boolean }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = passed ? '#10b981' : '#f59e0b';

    return (
        <div className="qr-circle-wrapper">
            <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                    style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
            </svg>
            <div className="qr-circle-inner">
                <span className="qr-score-pct" style={{ color }}>{score}%</span>
                <span className="qr-score-label">{passed ? '✅ Pass' : '❌ Fail'}</span>
            </div>
        </div>
    );
}

export default function Result({
    token, candidateName, jobTitle, score, passed,
    totalQuestions, correctCount, questions, timeTaken,
}: Props) {
    const firstName = candidateName.split(' ')[0];
    const wrongCount = totalQuestions - correctCount;

    const message = passed
        ? `Excellent work, ${firstName}! You cleared the 60% threshold.`
        : `Good effort, ${firstName}. You need 60% to pass — keep practicing!`;

    return (
        <div className="qr-root">
            <div className="qr-bg" />

            <div className="qr-wrapper">
                {/* Header */}
                <div className="qr-header">
                    <div className="qr-header-text">
                        <h1 className="qr-title">Quiz Results</h1>
                        <p className="qr-subtitle">{jobTitle}</p>
                    </div>
                </div>

                {/* Score card */}
                <div className="qr-score-card">
                    <CircleScore score={score} passed={passed} />
                    <div className="qr-score-info">
                        <p className="qr-message">{message}</p>
                        <div className="qr-stats-row">
                            <div className="qr-stat qr-stat--correct">
                                <span className="qr-stat-val">{correctCount}</span>
                                <span className="qr-stat-lbl">Correct</span>
                            </div>
                            <div className="qr-stat qr-stat--wrong">
                                <span className="qr-stat-val">{wrongCount}</span>
                                <span className="qr-stat-lbl">Wrong</span>
                            </div>
                            <div className="qr-stat qr-stat--total">
                                <span className="qr-stat-val">{totalQuestions}</span>
                                <span className="qr-stat-lbl">Total</span>
                            </div>
                            {timeTaken !== null && (
                                <div className="qr-stat qr-stat--time">
                                    <span className="qr-stat-val">{formatTime(timeTaken)}</span>
                                    <span className="qr-stat-lbl">Time Taken</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Q&A Review */}
                <h2 className="qr-review-title">📖 Question Review</h2>

                <div className="qr-questions">
                    {questions.map((q, idx) => (
                        <div key={idx} className={`qr-q-card ${q.is_correct ? 'qr-q-card--correct' : 'qr-q-card--wrong'}`}>
                            <div className="qr-q-header">
                                <span className="qr-q-num">Q{q.number}</span>
                                <span className={`qr-q-badge ${q.is_correct ? 'qr-q-badge--correct' : 'qr-q-badge--wrong'}`}>
                                    {q.is_correct ? '✓ Correct' : q.selected_option ? '✗ Incorrect' : '— Skipped'}
                                </span>
                            </div>
                            <p className="qr-q-text">{q.text}</p>

                            <div className="qr-options">
                                {(['a', 'b', 'c', 'd'] as const).map(opt => {
                                    const isCorrect = q.correct_option === opt;
                                    const isSelected = q.selected_option === opt;
                                    const optClass = isCorrect
                                        ? 'qr-opt--correct'
                                        : isSelected && !isCorrect
                                            ? 'qr-opt--wrong'
                                            : '';

                                    return (
                                        <div key={opt} className={`qr-opt ${optClass}`}>
                                            <span className={`qr-opt-letter ${optClass}`}>
                                                {opt.toUpperCase()}
                                            </span>
                                            <span className="qr-opt-text">{getOptionText(q, opt)}</span>
                                            {isCorrect && <span className="qr-opt-icon">✓</span>}
                                            {isSelected && !isCorrect && <span className="qr-opt-icon qr-opt-icon--wrong">✗</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="qr-footer-note">
                    Your results have been submitted to the hiring team. Thank you for applying!
                </p>
            </div>

            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .qr-root {
                    min-height: 100vh;
                    background: #0a0a14;
                    font-family: 'Inter', system-ui, sans-serif;
                    position: relative;
                }

                .qr-bg {
                    position: fixed;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 60% 40% at 20% 0%, rgba(16,185,129,0.15) 0%, transparent 70%),
                        radial-gradient(ellipse 50% 30% at 90% 80%, rgba(99,102,241,0.15) 0%, transparent 60%);
                    pointer-events: none;
                    z-index: 0;
                }

                .qr-wrapper {
                    position: relative;
                    z-index: 1;
                    max-width: 760px;
                    margin: 0 auto;
                    padding: 2rem 1rem 4rem;
                }

                /* Header */
                .qr-header {
                    margin-bottom: 1.75rem;
                    animation: fadeUp 0.4s ease both;
                }

                .qr-title {
                    font-size: 1.875rem;
                    font-weight: 800;
                    color: #f1f5f9;
                    letter-spacing: -0.03em;
                }

                .qr-subtitle {
                    color: #64748b;
                    font-size: 0.9rem;
                    margin-top: 0.25rem;
                }

                /* Score card */
                .qr-score-card {
                    background: rgba(15,15,30,0.9);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    padding: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
                    animation: fadeUp 0.5s ease 0.1s both;
                }

                .qr-circle-wrapper {
                    position: relative;
                    flex-shrink: 0;
                }

                .qr-circle-inner {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2px;
                }

                .qr-score-pct {
                    font-size: 1.6rem;
                    font-weight: 800;
                    line-height: 1;
                }

                .qr-score-label {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #94a3b8;
                    letter-spacing: 0.04em;
                }

                .qr-score-info {
                    flex: 1;
                }

                .qr-message {
                    font-size: 0.95rem;
                    color: #cbd5e1;
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .qr-stats-row {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .qr-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 0.6rem 0.875rem;
                    min-width: 64px;
                }

                .qr-stat-val {
                    font-size: 1.2rem;
                    font-weight: 800;
                    color: #f1f5f9;
                    line-height: 1;
                    margin-bottom: 2px;
                }

                .qr-stat-lbl {
                    font-size: 0.68rem;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    font-weight: 500;
                }

                .qr-stat--correct { border-color: rgba(16,185,129,0.3); }
                .qr-stat--correct .qr-stat-val { color: #34d399; }
                .qr-stat--wrong { border-color: rgba(239,68,68,0.3); }
                .qr-stat--wrong .qr-stat-val { color: #f87171; }

                /* Review title */
                .qr-review-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #e2e8f0;
                    margin-bottom: 1rem;
                    animation: fadeUp 0.5s ease 0.2s both;
                }

                /* Questions */
                .qr-questions {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .qr-q-card {
                    background: rgba(15,15,30,0.85);
                    border-radius: 14px;
                    padding: 1.25rem 1.5rem;
                    border-left: 4px solid transparent;
                    backdrop-filter: blur(12px);
                    animation: fadeUp 0.4s ease both;
                }

                .qr-q-card--correct {
                    border-color: #10b981;
                    border-top: 1px solid rgba(16,185,129,0.15);
                    border-right: 1px solid rgba(16,185,129,0.1);
                    border-bottom: 1px solid rgba(16,185,129,0.1);
                }

                .qr-q-card--wrong {
                    border-color: #ef4444;
                    border-top: 1px solid rgba(239,68,68,0.15);
                    border-right: 1px solid rgba(239,68,68,0.1);
                    border-bottom: 1px solid rgba(239,68,68,0.1);
                }

                .qr-q-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.625rem;
                }

                .qr-q-num {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .qr-q-badge {
                    font-size: 0.72rem;
                    font-weight: 700;
                    padding: 0.2rem 0.6rem;
                    border-radius: 100px;
                    letter-spacing: 0.03em;
                }

                .qr-q-badge--correct {
                    background: rgba(16,185,129,0.15);
                    color: #34d399;
                    border: 1px solid rgba(16,185,129,0.3);
                }

                .qr-q-badge--wrong {
                    background: rgba(239,68,68,0.12);
                    color: #f87171;
                    border: 1px solid rgba(239,68,68,0.25);
                }

                .qr-q-text {
                    font-size: 0.9rem;
                    color: #e2e8f0;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }

                .qr-options {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .qr-opt {
                    display: flex;
                    align-items: center;
                    gap: 0.625rem;
                    padding: 0.5rem 0.75rem;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .qr-opt--correct {
                    background: rgba(16,185,129,0.1) !important;
                    border-color: rgba(16,185,129,0.35) !important;
                }

                .qr-opt--wrong {
                    background: rgba(239,68,68,0.1) !important;
                    border-color: rgba(239,68,68,0.3) !important;
                }

                .qr-opt-letter {
                    flex-shrink: 0;
                    width: 22px;
                    height: 22px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.65rem;
                    font-weight: 800;
                    background: rgba(255,255,255,0.06);
                    color: #64748b;
                }

                .qr-opt--correct .qr-opt-letter {
                    background: #10b981;
                    color: #fff;
                }

                .qr-opt--wrong .qr-opt-letter {
                    background: #ef4444;
                    color: #fff;
                }

                .qr-opt-text {
                    flex: 1;
                    font-size: 0.82rem;
                    color: #94a3b8;
                    line-height: 1.4;
                }

                .qr-opt--correct .qr-opt-text { color: #d1fae5; }
                .qr-opt--wrong .qr-opt-text { color: #fecaca; }

                .qr-opt-icon { font-size: 0.85rem; color: #10b981; font-weight: 700; }
                .qr-opt-icon--wrong { color: #ef4444; }

                /* Footer */
                .qr-footer-note {
                    text-align: center;
                    font-size: 0.8rem;
                    color: #475569;
                    line-height: 1.5;
                    margin-top: 2rem;
                    padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 10px;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 600px) {
                    .qr-score-card { flex-direction: column; text-align: center; }
                    .qr-stats-row { justify-content: center; }
                    .qr-title { font-size: 1.4rem; }
                }
            `}</style>
        </div>
    );
}
