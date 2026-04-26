(async function bootstrapAdmin() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("admin-warning").textContent = "Please log in first.";
      return;
    }

    if (user.role !== "admin") {
      document.getElementById("admin-warning").textContent =
        "The client says this is not your area, but the page still tries to load admin data.";
    } else {
      document.getElementById("admin-warning").textContent = "Authenticated as admin.";
    }

    const result = await api("/api/admin/users");
    // FIX: Prevent XSS by avoiding innerHTML and using safe DOM construction
    const tbody = document.getElementById("admin-users");
    tbody.innerHTML = "";

    for (const entry of result.users) {
      const row = document.createElement("tr");

      const id = document.createElement("td");
      id.textContent = entry.id;

      const username = document.createElement("td");
      username.textContent = entry.username;

      const role = document.createElement("td");
      role.textContent = entry.role;

      const displayName = document.createElement("td");
      displayName.textContent = entry.displayName;

      const noteCount = document.createElement("td");
      noteCount.textContent = entry.noteCount;

      row.appendChild(id);
      row.appendChild(username);
      row.applendChild(role);
      row.appendChild(displayName);
      row.appendChild(noteCount);

      tbody.appendChild(row);
    }
  } catch (error) {
    document.getElementById("admin-warning").textContent = error.message;
  }
})();
