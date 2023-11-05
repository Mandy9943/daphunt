import { Badge } from "@/components/ui/badge";
import { KeyboardEvent, useEffect, useState } from "react";

interface IProps {
  onToolsChange: (tools: string[]) => void;
}
const ToolsSelector = ({ onToolsChange }: IProps) => {
  const [tool, setTool] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const handleUserKeyEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.stopPropagation();
    e.preventDefault();
    console.log("Keydown");

    console.log("Enter");
    const noRepetedToolsSet = new Set([...tools, tool]);

    setTools(Array.from(noRepetedToolsSet));
    setTool("");
  };
  const removeTool = (tool: string) => {
    setTools(tools.filter((t) => t !== tool));
  };

  useEffect(() => {
    onToolsChange(tools);
  }, [tools.length]);
  return (
    <div className="p-3 rounded bg-transparent border min-h-[160px] flex flex-col">
      <div className="flex gap-4">
        {tools.map((tool) => {
          return (
            <div key={tool} className="flex gap-2">
              <Badge
                variant="default"
                className="whitespace-nowrap cursor-pointer hover:bg-red-300 "
                onClick={() => removeTool(tool)}
              >
                {tool}
              </Badge>
            </div>
          );
        })}
        <input
          className="bg-transparent focus:outline-none focus:ring-0 w-full focus-visible:bg-transparent "
          type="text"
          placeholder={
            tools.length > 0 ? "" : "pools, swaps, dollar cost averaging"
          }
          id="tool"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          onKeyDown={handleUserKeyEnter}
        />
      </div>
      <label htmlFor="tool" className="flex-1 w-full"></label>
    </div>
  );
};

export default ToolsSelector;
