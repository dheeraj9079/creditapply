import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import BusinessInfo from "./pages/BusinessInfo";
import Results from "./pages/Results";
import ErrorPage from "./pages/ErrorPage";
import Applicant from "./pages/Applicant";


const getContentByTitle = (title: string) => {
  console.log("========", store.getState().content.content);
  
  return store.getState().content.content.find((item) => item.title === title)?.text || "";
};

const getThemeByName = (title: string) => {
  return store.getState().theme.themes.find((item) => item.themeName === title)?.themeValue || "";
};

const App: React.FC = () => {
  console.log("--------", getThemeByName("Policy_Link_Text"));
  
  return (
    <Provider store={store}>
      <BrowserRouter basename="/creditapply">
        <Routes>
          <Route path=":clientName/business-info" element={<BusinessInfo />} />
          <Route path=":clientName/applicant" element={<Applicant />} />
          <Route path=":clientName/results" element={<Results />} />
          {/* Catch all unmatched */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
