import { Badge } from "@/components/ui/badge";
import { KeyboardEvent, useEffect, useState } from "react";

interface IProps {
  onToolsChange: (tools: string[]) => void;
}
const ToolsSelector = ({ onToolsChange }: IProps) => {
  const [tool, setTool] = useState("");
  const [toolBubble, setToolBubble] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const handleUserKeyEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== ",") return;

    e.stopPropagation();
    e.preventDefault();
    addTool();
  };
  const removeTool = (tool: string) => {
    setTools(tools.filter((t) => t !== tool));
  };

  const addTool = () => {
    console.log("Keydown");

    console.log("Enter");
    const noRepetedToolsSet = new Set([...tools, tool]);

    setTools(Array.from(noRepetedToolsSet));
    setTool("");
  };

  useEffect(() => {
    onToolsChange(tools);
  }, [tools.length]);
  return (
    <div className="p-3 rounded bg-transparent border min-h-[160px] flex flex-col flex-wrap">
      <div className="flex gap-4 flex-wrap">
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
        <Badge
          variant={"secondary"}
          disable={tool.length === 0}
          onClick={() => tool.length > 0 && addTool()}
        >
          <input
            className="bg-transparent focus:outline-none focus:ring-0  focus-visible:bg-transparent"
            style={{
              width: `${25 + tool.length * 6}px`,
            }}
            autoComplete="off"
            type="text"
            // placeholder={
            //   tools.length > 0 ? "" : "pools, swaps, dollar cost averaging"
            // }
            id="tool"
            value={tool}
            onChange={(e) => setTool(e.target.value)}
            onKeyDown={handleUserKeyEnter}
          />
        </Badge>
      </div>
      <label htmlFor="tool" className="flex-1 w-full"></label>
    </div>
  );
};

export default ToolsSelector;
