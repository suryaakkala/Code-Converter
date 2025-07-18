# 🧠 Code Converter

A modern, AI-powered code conversion app built with Next.js 15 and LLaMA 3.1 via Groq. Seamlessly convert code between **C**, **Java**, and **Python** while preserving functionality and syntax fidelity.

<!-- ![Screenshot](https://via.placeholder.com/1200x600?text=Project+Screenshot) Replace with actual screenshot -->

---

## 🚀 Features

- 🔁 **Language Conversion** – Instantly translate between C, Java, and Python.
- 🤖 **AI Integration** – Powered by Groq's blazing-fast **LLaMA 3.1** model using `@ai-sdk/groq`.
- 🎨 **Modern UI** – Built with Radix UI, Tailwind CSS, and responsive design.
- ⚡ **Real-Time UX** – Live feedback with loading indicators, toast notifications, and copy-to-clipboard.

---

## 🛠️ Tech Stack

| Area               | Tools Used                                                                 |
|--------------------|----------------------------------------------------------------------------|
| Framework          | [Next.js 15](https://nextjs.org/) (App Router, Server Actions)             |
| AI/LLM             | [Groq + LLaMA 3.1](https://groq.com/) via [`@ai-sdk/groq`](https://www.npmjs.com/package/@ai-sdk/groq) |
| Styling            | [Tailwind CSS](https://tailwindcss.com/), `tailwind-merge`, `clsx`         |
| UI Components      | [Radix UI](https://www.radix-ui.com/), `lucide-react`, `recharts`          |
| Forms & Validation | `react-hook-form`, `zod` (optional)                                        |
| Toasts & Themes    | `sonner`, `next-themes`                                                    |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/suryaakkala/Code-Converter.git
cd Code-Converter

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

> Make sure you're using **Node.js v18+** and **pnpm** as your package manager.

---

## 🧪 Usage

1. Select the source and target programming languages.
2. Paste your source code into the input box.
3. Click **"Convert Code"**.
4. Copy the converted code from the output section.

---

## 🧬 AI Model & Prompt

The app uses the Groq API with the `llama-3.1-8b-instant` model and a carefully engineered prompt to ensure:
- Accurate code conversion
- No markdown or explanation in the response
- Language-specific adaptation

---

## 📁 Project Structure

```
suryaakkala-code-converter/
├── app/                # App routes, layout, server actions
├── components/         # Reusable UI components (Radix + custom)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── styles/             # Global styles
├── public/             # Static assets
├── tailwind.config.ts  # TailwindCSS configuration
├── next.config.mjs     # Next.js configuration
```

---

## 👨‍💻 Author

**Surya Akkala**  
GitHub: [@suryaakkala](https://github.com/suryaakkala)

> This project was developed as part of a skill development initiative.

---


Feel free to fork and enhance the project!
