import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  content.classList.add("placeholder")

  const url = input.value

  if (!url.includes("shorts")) {
    return (content.textContent = "Este vídeo não é um short.")
  }

  const [, params] = url.split("/shorts/")
  const [id] = params.split("?si")

  content.textContent = "Obtendo audio do vídeo..."

  const transcription = await server.get("/summary/" + id)

  content.textContent = "Realizando resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
