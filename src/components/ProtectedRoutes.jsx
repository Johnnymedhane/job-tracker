function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  // const isAuthenticated = JSON.parse(localStorage.getItem("auth")) || false;

      // Debugging output
      console.log("ProtectedRoute localStorage auth:", localStorage.getItem("auth"));
      console.log("ProtectedRoute localStorage user:", localStorage.getItem("user"));

      // Check if the user is authenticated
      return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute

