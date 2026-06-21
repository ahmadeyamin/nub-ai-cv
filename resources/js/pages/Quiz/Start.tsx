import { useForm } from '@inertiajs/react';

interface Props {
    token: string;
    candidateName: string;
    jobTitle: string;
    questionsCount: number;
    timeLimitMins: number;
}

export default function Start({ token, candidateName, jobTitle, questionsCount, timeLimitMins }: Props) {
    const { post, processing } = useForm();

    function handleStart(e: React.FormEvent) {
        e.preventDefault();
        post(`/quiz/${token}/start`);
    }

    return (
        <div className="qs-root">
            <div className="qs-bg" />

            <div className="qs-card">
                {/* Header badge */}
                <div className="qs-badge">✅ Quiz Ready</div>

                <h1 className="qs-title">
                    Hello, <span className="qs-name">{candidateName.split(' ')[0]}</span>!
                </h1>
                <p className="qs-subtitle">
                    Your quiz for <strong>{jobTitle}</strong> is ready. Read the rules below before you begin.
                </p>

                {/* Stats row */}
                <div className="qs-stats">
                    <div className="qs-stat">
                        <span className="qs-stat-icon">❓</span>
                        <span className="qs-stat-value">{questionsCount}</span>
                        <span className="qs-stat-label">Questions</span>
                    </div>
                    <div className="qs-stat-divider" />
                    <div className="qs-stat">
                        <span className="qs-stat-icon">⏱️</span>
                        <span className="qs-stat-value">{timeLimitMins}</span>
                        <span className="qs-stat-label">Minutes</span>
                    </div>
                    <div className="qs-stat-divider" />
                    <div className="qs-stat">
                        <span className="qs-stat-icon">🎯</span>
                        <span className="qs-stat-value">60%</span>
                        <span className="qs-stat-label">To Pass</span>
                    </div>
                </div>

                {/* Rules */}
                <div className="qs-rules-box">
                    <h2 className="qs-rules-heading">📋 Important Rules</h2>
                    <ul className="qs-rules">
                        <li>Questions are displayed <strong>one at a time</strong> — you cannot go back.</li>
                        <li>Timer starts the moment you click <strong>"Start Quiz"</strong> — you have <strong>{timeLimitMins} minutes total</strong>.</li>
                        <li>Answer as fast as you like — there is <strong>no per-question time limit</strong>.</li>
                        <li>Each question has <strong>4 options</strong> — choose the most correct answer.</li>
                        <li>When the timer runs out, unanswered questions are marked <strong>incorrect</strong>.</li>
                        <li><strong>No retakes</strong> are allowed once you begin.</li>
                        <li>Your results will be shown immediately after the quiz.</li>
                    </ul>
                </div>

                {/* CTA */}
                <form onSubmit={handleStart}>
                    <button
                        type="submit"
                        className="qs-start-btn"
                        disabled={processing}
                        id="quiz-start-btn"
                    >
                        {processing ? (
                            <>
                                <span className="qs-btn-spinner" />
                                Starting…
                            </>
                        ) : (
                            <>
                                🚀 Start Quiz
                            </>
                        )}
                    </button>
                </form>

                <p className="qs-confirm-text">
                    By clicking Start Quiz, you confirm you are ready and understand the rules above.
                </p>
            </div>

            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .qs-root {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 1rem;
                    background: #0a0a14;
                    font-family: 'Inter', system-ui, sans-serif;
                    position: relative;
                }

                .qs-bg {
                    position: fixed;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 70% 40% at 30% 0%, rgba(16,185,129,0.2) 0%, transparent 70%),
                        radial-gradient(ellipse 60% 40% at 80% 90%, rgba(99,102,241,0.2) 0%, transparent 60%);
                    pointer-events: none;
                    z-index: 0;
                }

                .qs-card {
                    position: relative;
                    z-index: 1;
                    background: rgba(15,15,30,0.9);
                    border: 1px solid rgba(16,185,129,0.25);
                    backdrop-filter: blur(24px);
                    border-radius: 24px;
                    padding: 3rem 2.5rem;
                    max-width: 620px;
                    width: 100%;
                    box-shadow: 0 0 60px rgba(16,185,129,0.1), 0 20px 60px rgba(0,0,0,0.5);
                    animation: fadeUp 0.5s ease both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .qs-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: rgba(16,185,129,0.15);
                    border: 1px solid rgba(16,185,129,0.35);
                    color: #34d399;
                    font-size: 0.8rem;
                    font-weight: 600;
                    padding: 0.3rem 0.75rem;
                    border-radius: 100px;
                    margin-bottom: 1.25rem;
                    letter-spacing: 0.03em;
                }

                .qs-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #f1f5f9;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.03em;
                }

                .qs-name {
                    background: linear-gradient(135deg, #34d399, #059669);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .qs-subtitle {
                    color: #94a3b8;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }

                .qs-subtitle strong { color: #e2e8f0; }

                /* Stats */
                .qs-stats {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 1.25rem;
                    margin-bottom: 1.75rem;
                }

                .qs-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.2rem;
                    flex: 1;
                }

                .qs-stat-icon { font-size: 1.25rem; }

                .qs-stat-value {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #f1f5f9;
                    line-height: 1;
                }

                .qs-stat-label {
                    font-size: 0.75rem;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    font-weight: 500;
                }

                .qs-stat-divider {
                    width: 1px;
                    height: 48px;
                    background: rgba(255,255,255,0.1);
                }

                /* Rules */
                .qs-rules-box {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 12px;
                    padding: 1.25rem 1.5rem;
                    margin-bottom: 2rem;
                }

                .qs-rules-heading {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #cbd5e1;
                    margin-bottom: 0.875rem;
                }

                .qs-rules {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                    padding-left: 0;
                }

                .qs-rules li {
                    color: #94a3b8;
                    font-size: 0.875rem;
                    line-height: 1.5;
                    padding-left: 1.2rem;
                    position: relative;
                }

                .qs-rules li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: #34d399;
                    font-weight: 700;
                }

                .qs-rules li strong { color: #e2e8f0; }

                /* Start button */
                .qs-start-btn {
                    width: 100%;
                    padding: 1rem;
                    background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
                    border: none;
                    border-radius: 12px;
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    letter-spacing: -0.01em;
                    transition: opacity 0.2s, transform 0.15s;
                    box-shadow: 0 4px 20px rgba(16,185,129,0.4);
                    margin-bottom: 1rem;
                }

                .qs-start-btn:hover:not(:disabled) {
                    opacity: 0.92;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 28px rgba(16,185,129,0.5);
                }

                .qs-start-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                .qs-start-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .qs-btn-spinner {
                    width: 18px;
                    height: 18px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    display: inline-block;
                }

                @keyframes spin { to { transform: rotate(360deg); } }

                .qs-confirm-text {
                    text-align: center;
                    font-size: 0.75rem;
                    color: #475569;
                    line-height: 1.5;
                }

                @media (max-width: 480px) {
                    .qs-card { padding: 2rem 1.25rem; }
                    .qs-title { font-size: 1.5rem; }
                    .qs-stat-value { font-size: 1.4rem; }
                }
            `}</style>
        </div>
    );
}
