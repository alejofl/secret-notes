import { ProtectionCard } from "@/components/notes/protection-card";
import type { Note } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'


export const Route = createFileRoute("/$noteId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { noteId } = Route.useParams()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passphrase, setPassphrase] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const note: Note = {
        id: noteId,
        title: "Example Markdown File",
        text: "# My Project\n\nWelcome to **My Project**! This is a sample Markdown file to demonstrate common syntax.\n\n---\n\n## Table of Contents\n\n- [Introduction](#introduction)\n- [Features](#features)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contributing](#contributing)\n- [License](#license)\n\n---\n\n## Introduction\n\nThis project is designed to show how Markdown works. Markdown is a lightweight markup language for creating formatted text using a plain-text editor.\n\n---\n\n## Features\n\n- ✅ Easy to read\n- ✍️ Simple syntax\n- 💻 Works on GitHub and many other platforms\n\n---\n\n## Installation\n\nTo install this project, clone the repository:\n\n```bash\ngit clone https://github.com/your-username/my-project.git\ncd my-project\n```\n\n---\n\n## Usage\n\nHere's how you use this project:\n\n```python\ndef hello_world():\n    print(\"Hello, world!\")\n\nhello_world()\n```\n\n---\n\n## Contributing\n\nContributions are welcome! Please fork the repository and open a pull request.\n\n1. Fork it 🍴  \n2. Create your feature branch: `git checkout -b my-new-feature`  \n3. Commit your changes: `git commit -am 'Add some feature'`  \n4. Push to the branch: `git push origin my-new-feature`  \n5. Submit a pull request ✅\n\n---\n\n## License\n\nThis project is licensed under the MIT License. See the `LICENSE` file for details.\n\n---\n\n## Contact\n\nFeel free to reach out:\n\n- GitHub: [your-username](https://github.com/your-username)\n- Email: your.email@example.com\n",
        createdAt: new Date("2024-12-15T10:00:00Z"),
    } // TODO: Bring from API

    async function handleAuthentication(e: React.FormEvent<HTMLFormElement>) {
        // TODO: Validate passphrase against API
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 500))
        setIsAuthenticated(true)
        setIsLoading(false)
    }

    if (!isAuthenticated) {
        return (
            <div className="grow flex items-center justify-center">
                <ProtectionCard
                    passphrase={passphrase}
                    setPassphrase={setPassphrase}
                    error={undefined}
                    isLoading={isLoading}
                    onSubmit={handleAuthentication}
                />
            </div>
        )
    }

    return (
        <div>
            <div className="space-y-2 pb-4">
                <h1 className="text-2xl font-semibold text-foreground">{note.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>Created on {note.createdAt.toLocaleDateString("en-US", { dateStyle: "full" })}</span>
                </div>
            </div>
            <div className="prose prose-sm text-foreground leading-relaxed rounded-md p-4 border markdown-body">
                <Markdown remarkPlugins={[remarkGfm]}>{note.text}</Markdown>
            </div>
        </div>
    )
}
