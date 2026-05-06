import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import ErrorLayout from "./pages/ErrorLayout";
import AboutmePage from "./pages/AboutmePage";
import LookbookPage from "./pages/LookbookPage";
import ProjectsPage from "./pages/ProjectsPage";
import UploadPage from "./pages/UploadPage";
import DrawPage from "./pages/DrawPage";
import ProjectShowcasePage from "./pages/ProjectShowcasePage";
import CalculatorHiddenPage from "./pages/CalculatorHiddenPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorLayout />,
    children: [
      { index: true, element: <AboutmePage /> },
      { path: "lookbook", element: <LookbookPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:projectSlug", element: <ProjectShowcasePage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "draw", element: <DrawPage /> },
      { path: "calculator", element: <CalculatorHiddenPage /> },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
