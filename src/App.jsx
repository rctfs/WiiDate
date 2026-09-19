// App.jsx
import { Route, Routes } from "react-router-dom"; // Importa Routes
import "./App.css";
import MainMenu from "./components/MainMenu";
import WarningMenu from "./components/WarningMenu";
import AboutMe from "./components/AboutMe";
import MiiEditorView from "./components/MiiEditorView";
import MatchaView from "./components/MatchaView";
import ScheduleView from "./components/ScheduleView";
import MusicPlayer from "./components/MusicPlayer";

function App() {
    return (
        <>
            <MusicPlayer />
            <Routes>
                <Route path="/main-menu" element={<MainMenu />} />
                <Route path="/" element={<WarningMenu />} />
                <Route path="/about-me" element={<AboutMe />} />
                <Route path="/matcha" element={<MatchaView />} />
                <Route path="/schedule" element={<ScheduleView />} />
                <Route path="/mii-editor" element={<MiiEditorView />} />
            </Routes>
        </>
    );
}

export default App;
