import { useState, useEffect } from "react"
import AppRouter from "./router/router"
import Splash from "./components/Splash/Splash"

function App() {
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        // Проверяем, показывали ли заставку в этой сессии
        const splashShown = sessionStorage.getItem("splashShown")
        if (splashShown) {
            setShowSplash(false)
        }
    }, [])

    const handleSplashFinish = () => {
        sessionStorage.setItem("splashShown", "true")
        setShowSplash(false)
    }

    if (showSplash) {
        return <Splash onFinish={handleSplashFinish} />
    }

    return <AppRouter />
}

export default App