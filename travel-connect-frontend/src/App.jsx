import { useState, useEffect } from "react"
import TravelerList from "./components/TravelerList"
import DestinationList from "./components/DestinationList"
import ExperienceList from "./components/ExperienceList"

function App() {
  const [tab, setTab] = useState("travelers")

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🌍 Travel App</h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        marginBottom: "32px"
      }}>
        <button
          onClick={() => setTab("travelers")}
          style={{
            flex: 1,
            padding: "16px 0",
            fontSize: "1.1em",
            fontWeight: "bold",
            background: tab === "travelers" ? "#007bff" : "#f0f0f0",
            color: tab === "travelers" ? "#fff" : "#333",
            border: "none",
            borderRadius: "12px",
            boxShadow: tab === "travelers" ? "0 2px 8px rgba(0,123,255,0.12)" : "none",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Travelers
        </button>
        <button
          onClick={() => setTab("destinations")}
          style={{
            flex: 1,
            padding: "16px 0",
            fontSize: "1.1em",
            fontWeight: "bold",
            background: tab === "destinations" ? "#007bff" : "#f0f0f0",
            color: tab === "destinations" ? "#fff" : "#333",
            border: "none",
            borderRadius: "12px",
            boxShadow: tab === "destinations" ? "0 2px 8px rgba(0,123,255,0.12)" : "none",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Destinations
        </button>
        <button
          onClick={() => setTab("experiences")}
          style={{
            flex: 1,
            padding: "16px 0",
            fontSize: "1.1em",
            fontWeight: "bold",
            background: tab === "experiences" ? "#007bff" : "#f0f0f0",
            color: tab === "experiences" ? "#fff" : "#333",
            border: "none",
            borderRadius: "12px",
            boxShadow: tab === "experiences" ? "0 2px 8px rgba(0,123,255,0.12)" : "none",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          Experiences
        </button>
      </div>

      {tab === "travelers" && <TravelerList />}
      {tab === "destinations" && <DestinationList />}
      {tab === "experiences" && <ExperienceList />}
    </div>
  )
}

export default App
