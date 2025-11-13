import { Link } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo/todo.png";
import "../css/Home.css";

function Home() {
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    return (
        <div className="home-container">
            <div className="top-home-btn">
                <div className="home-buttons">
                    <Link to="/login" className="home-btn login">Login</Link>
                    <Link to="/register" className="home-btn register">Register</Link>
                </div>
            </div>
            <button onClick={toggleTheme} className="theme-toggle">
                &#128161;
            </button>
            <img src={logo} alt="App Logo" className="home-logo fade-in" />

            <h1 className="home-title fade-in">Conquer Your Tasks with Ease</h1>
            <div className="hero-content fade-in">
                <p>
                Streamline your productivity and never forget a deadline with our powerful
                todo task manager.
                </p>
            </div>
            <p className="home-subtitle fade-in">
                Stay organized, manage your tasks, and boost your productivity.
            </p>

            <div className="features-section fade-in">
                <h2 className="features-title">Why Choose ToDo Manager?</h2>
                <div className="features-grid">
                <div className="feature-card fade-in" style={{animationDelay: "0.1s"}}>
                    <span className="feature-icon">📝</span>
                    <h3>Task Organization</h3>
                    <p>Create, manage, and categorize tasks easily.</p>
                </div>
                <div className="feature-card fade-in" style={{animationDelay: "0.2s"}}>
                    <span className="feature-icon">⏰</span>
                    <h3>Due Dates</h3>
                    <p>Never miss a deadline with task scheduling.</p>
                </div>
                <div className="feature-card fade-in" style={{animationDelay: "0.3s"}}>
                    <span className="feature-icon">🔔</span>
                    <h3>Reminders</h3>
                    <p>Get notified before your tasks are due.</p>
                </div>
                <div className="feature-card fade-in" style={{animationDelay: "0.4s"}}>
                    <span className="feature-icon">🤝</span>
                    <h3>Collaboration</h3>
                    <p>Work with teammates and share progress.</p>
                </div>
                <div className="feature-card fade-in" style={{animationDelay: "0.5s"}}>
                    <span className="feature-icon">📊</span>
                    <h3>Progress Tracking</h3>
                    <p>Track completed tasks and boost productivity.</p>
                </div>
                </div>
                <div className="section-cta">
                    <Link to="/register" className="cta-btn primary">Start Organizing Now</Link>
                </div>
            </div>

            <div className="testimonials-section fade-in">
                <h2 className="testimonials-title">What Our Users Say</h2>
                <div className="testimonials-grid">
                    <h1>Join today and share your experience later... &#128077;</h1>
                    {/* <div className="testimonial-card">
                        <p>
                        "This app completely changed how I organize my day. I never miss a deadline anymore!"
                        </p>
                        <span>- Sarah M., Student</span>
                    </div>
                    <div className="testimonial-card">
                        <p>
                        "The reminders feature is a lifesaver. It keeps me on track with all my work projects."
                        </p>
                        <span>- David K., Project Manager</span>
                    </div>
                    <div className="testimonial-card">
                        <p>
                        "Simple, clean, and effective. Exactly what I needed for my daily task management."
                        </p>
                        <span>- Emily R., Freelancer</span>
                    </div> */}
                </div>
            </div>
            <div className="pricing-section fade-in">
                <h2 className="pricing-title">Choose Your Plan</h2>
                <div className="pricing-grid">
                    <div className="pricing-card fade-in" style={{animationDelay: "0.2s"}}>
                        <h3>Free</h3>
                        <p className="price">$0 / month</p>
                        <ul>
                            <li>&#10004; Create unlimited tasks</li>
                            <li>&#10004; Due dates & reminders</li>
                            <li>&#10004; Basic progress tracking</li>
                            <li>❌ No team collaboration</li>
                        </ul>
                        <Link to="/register" className="home-btn register">Get Started</Link>
                    </div>

                    <div className="pricing-card highlight fade-in" style={{animationDelay: "0.4s"}}>
                        <h3>Pro</h3>
                        <p className="price">$9.99 / month</p>
                        <ul>
                            <li>&#10004; Unlimited tasks & projects</li>
                            <li>&#10004; Advanced reminders</li>
                            <li>&#10004; Team collaboration</li>
                            <li>&#10004; Priority support</li>
                        </ul>
                        <Link to="/register" className="home-btn login">Upgrade Now</Link>
                    </div>
                </div>

            <div className="walkthrough-section fade-in">
                <h2 className="walkthrough-title">See ToDo Manager in Action</h2>
                <p className="walkthrough-subtitle">
                    Explore the interface and key features through screenshots and a quick video demo.
                </p>
                <div className="screenshots-grid">
                    <img src="/screenshots/dashboard.png" alt="Dashboard Screenshot" className="screenshot" />
                    <img src="/screenshots/tasks.png" alt="Tasks Screenshot" className="screenshot" />
                    <img src="/screenshots/reminders.png" alt="Reminders Screenshot" className="screenshot" />
                </div>
                <div className="video-container">
                    <video controls className="walkthrough-video">
                        <source src="/walkthrough.mp4" type="video/mp4" />
                        <track
                            kind="captions"
                            srcLang="en"
                            src="/walkthrough-captions.vtt"
                            label="English captions"
                            default
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            
            <div className="faq-section fade-in">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3 className="faq-question">Is ToDo Manager free to use?</h3>
                        <p className="faq-answer">
                        Yes! ToDo Manager has a free plan with essential features. You can also
                        upgrade to premium for advanced features like collaboration and reminders.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3 className="faq-question">Can I use it on mobile devices?</h3>
                        <p className="faq-answer">
                        Absolutely. ToDo Manager is web-based and responsive, so you can access it
                        from your phone, tablet, or computer.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3 className="faq-question">Do I need to create an account?</h3>
                        <p className="faq-answer">
                        Yes, creating an account lets you securely save and sync your tasks across
                        devices.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3 className="faq-question">Can I collaborate with my team?</h3>
                        <p className="faq-answer">
                        Team collaboration is available in the premium plan, allowing you to share
                        tasks and track progress together.
                        </p>
                    </div>
                </div>
            </div>

            <div className="social-proof-section fade-in">
                <h2 className="social-proof-title">Trusted by Users and Teams Worldwide</h2>
                <p className="social-proof-subtitle">
                    ToDo Manager is used by individuals and organizations to stay on top of their
                    productivity.
                </p>
                <div className="social-logos">
                    <img src="/social/google.png" alt="Google" className="social-logo" />
                    <img src="/social/microsoft.png" alt="Microsoft" className="social-logo" />
                    <img src="/social/slack.png" alt="Slack" className="social-logo" />
                    <img src="/social/github.png" alt="GitHub" className="social-logo" />
                </div>
                <div className="social-quotes">
                    <blockquote>
                        “ToDo Manager has transformed how our team collaborates and tracks progress.”
                        <span> — Project Lead, Tech Corp</span>
                    </blockquote>
                    <blockquote>
                        “The reminders feature alone keeps me from missing important deadlines.”
                        <span>&mdash; Freelancer, Creative Studio</span>
                    </blockquote>
                </div>
            </div>

            <div className="final-cta fade-in">
                <h2>Ready to Take Control of Your Tasks?</h2>
                <p>Sign up today and boost your productivity with ToDo Manager.</p>
                <div>
                    <Link to="/register" className="cta-btn primary">Create Your Account</Link>
                    <Link to="/login" className="cta-btn secondary">Login</Link>
                </div>
            </div>

            <footer className="footer fade-in">
                <div className="footer-container">
                    <ul className="footer-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="https://github.com/BigJohn-dev" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                    <p className="footer-copy">&copy; {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
                </div>
            </footer>

        </div>
    </div>
    );
}
export default Home;
