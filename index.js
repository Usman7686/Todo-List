/* ================== GLOBAL ================== */
document.body.style.margin = "0";
document.body.style.fontFamily = "Inter, Arial, sans-serif";

/* ================== MAIN ================== */
const main = document.createElement("main");
Object.assign(main.style, {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #4f7cac, #1c2f4a)",
  transition: "0.3s"
});
document.body.appendChild(main);

/* ================== CARD ================== */
const card = document.createElement("div");
Object.assign(card.style, {
  width: "420px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  transition: "0.3s"
});
main.appendChild(card);

/* ================== HEADER ================== */
const header = document.createElement("div");
Object.assign(header.style, {
  padding: "20px",
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "20px",
  fontWeight: "600"
});
header.textContent = "Todo List";
card.appendChild(header);

/* ===== DARK MODE BUTTON ===== */
const darkBtn = document.createElement("button");
darkBtn.textContent = "🌙";
Object.assign(darkBtn.style, {
  border: "none",
  background: "transparent",
  fontSize: "18px",
  cursor: "pointer"
});
header.appendChild(darkBtn);

/* ================== INPUT ================== */
const inputBox = document.createElement("div");
Object.assign(inputBox.style, {
  padding: "15px 20px",
  display: "flex",
  gap: "10px"
});
card.appendChild(inputBox);

const input = document.createElement("input");
Object.assign(input.style, {
  flex: "1",
  padding: "10px 12px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none"
});
input.placeholder = "Add a new task";
inputBox.appendChild(input);

const addBtn = document.createElement("button");
addBtn.textContent = "Add";
Object.assign(addBtn.style, {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#4f7cac",
  color: "#fff",
  cursor: "pointer"
});
inputBox.appendChild(addBtn);

/* ================== LIST ================== */
const list = document.createElement("ul");
Object.assign(list.style, {
  listStyle: "none",
  padding: "0",
  margin: "0",
  maxHeight: "300px",
  overflowY: "auto"
});
card.appendChild(list);

/* ================== ADD TASK ================== */
function addTask() {
  if (!input.value.trim()) return;

  const li = document.createElement("li");
  Object.assign(li.style, {
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f0f0f0"
  });

  const text = document.createElement("span");
  text.textContent = input.value;

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "10px";

  const edit = document.createElement("span");
  edit.textContent = "✏️";
  edit.style.cursor = "pointer";

  const del = document.createElement("span");
  del.textContent = "🗑️";
  del.style.cursor = "pointer";

  edit.onclick = () => startEdit(li, text, edit);
  del.onclick = () => li.remove();

  actions.append(edit, del);
  li.append(text, actions);
  list.appendChild(li);

  input.value = "";
}

/* ================== EDIT ================== */
function startEdit(li, textEl, editBtn) {
  const editInput = document.createElement("input");
  editInput.value = textEl.textContent;
  editInput.style.flex = "1";

  li.replaceChild(editInput, textEl);
  editBtn.textContent = "💾";
  editInput.focus();

  editInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      textEl.textContent = editInput.value;
      li.replaceChild(textEl, editInput);
      editBtn.textContent = "✏️";
    }
  });
}

/* ================== EVENTS ================== */
addBtn.onclick = addTask;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

/* ================== DARK MODE LOGIC ================== */
let dark = false;

darkBtn.addEventListener("click", () => {
  dark = !dark;

  if (dark) {
    main.style.background = "#121212";
    card.style.backgroundColor = "#1e1e1e";
    card.style.color = "#ffffff";
    input.style.backgroundColor = "#2c2c2c";
    input.style.color = "#fff";
    input.style.border = "1px solid #444";
    darkBtn.textContent = "☀️";
  } else {
    main.style.background = "linear-gradient(135deg, #4f7cac, #1c2f4a)";
    card.style.backgroundColor = "#ffffff";
    card.style.color = "#000";
    input.style.backgroundColor = "#fff";
    input.style.color = "#000";
    input.style.border = "1px solid #ccc";
    darkBtn.textContent = "🌙";
  }
});
