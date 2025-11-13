import { Link } from "react-router-dom";
import logo from "../assets/logo/todo.png";
import "../css/Home.css";

function About() {
    return (
        <div className="about-container">
            <img src={logo} alt="App Logo" className="home-logo" />
            <div className="big-header">
                About
            </div>
        </div>
    );
}
export default About;

