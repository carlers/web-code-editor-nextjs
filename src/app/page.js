import CodeEditor from "./CodeEditor";
  
export default function Home() {
  return (
    <div>
      <div className="m-4">
        <h1 className="text-6xl">Online Code Editor</h1>
        <h2 className="text-2xl">by Carl Washington Siy</h2>
      </div>

      <CodeEditor />
    </div>
  );
}
