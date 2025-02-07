import React, { useState } from "react";

import { useConfig } from "../../context/ConfigContext/ConfigContext";
import ConfigEditor from "../ConfigEditor/ConfigEditor";
import DataEditor from "../DataEditor/DataEditor";
import "./drawerRight.css";

const Drawer: React.FC = () => {
  const { resetConfigContext, resetDataContext, emptyDataContext } =
    useConfig();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("config");

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = () => {
    // writeConfigJsonToFile();
    //writeDataJsonToFile();
  };

  return (
    <div>
      <div
        className="drawer-container"
        style={{ overflow: "auto", maxHeight: "80vh" }}
      >
        <div className={`drawer ${isOpen ? "open" : ""}`}>
          <div className="drawer-content">
            <h2 className="dawer-title">Tech Radar Customization Tool</h2>
            <div className="tabs">
              <button
                className={`tab-button ${
                  activeTab === "config" ? "active" : ""
                }`}
                onClick={() => setActiveTab("config")}
              >
                Config Editor
              </button>
              <button
                className={`tab-button ${activeTab === "data" ? "active" : ""}`}
                onClick={() => setActiveTab("data")}
              >
                Data Editor
              </button>
            </div>
          </div>
          {activeTab === "config" && <ConfigEditor />}
          {activeTab === "data" && <DataEditor />}
          <button className=" badge close-button" onClick={toggleDrawer}>
            Close
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="badge badge--first save-button">
              <button className="badge badge--first" onClick={emptyDataContext}>
                Empty Data
              </button>
            </div>
            <div className="badge badge--first save-button">
              <button className="badge badge--first" onClick={resetDataContext}>
                Reset Data
              </button>
            </div>
            <div className="badge badge--first save-button">
              <button
                className="badge badge--first"
                onClick={resetConfigContext}
              >
                Reset Config
              </button>
            </div>

            {/*

                            <div className="badge badge--first save-button">
                                <button className="badge badge--first" onClick={handleSave}>Save Configuration
                                    Permanently
                                </button>
                            </div>
                        */}
          </div>
        </div>
        <div
          className={`drawer-open-button ${isOpen ? "hidden" : ""}`}
          onClick={toggleDrawer}
        >
          Open Drawer
        </div>
      </div>
    </div>
  );
};

export default Drawer;
