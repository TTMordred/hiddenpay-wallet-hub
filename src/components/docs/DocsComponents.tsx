import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, AlertTriangle, Copy, Check } from "lucide-react";
import { useState } from "react";

// Code Block Component
interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ children, language = "bash", title, showLineNumbers = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.trim().split("\n");

  return (
    <div className="group relative my-4 rounded-xl border border-border overflow-hidden bg-[hsl(240,10%,6%)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(240,10%,8%)] border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-[hsl(0,0%,90%)] leading-relaxed">
          {showLineNumbers ? (
            <table className="border-collapse">
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i}>
                    <td className="pr-4 text-muted-foreground select-none text-right w-8">
                      {i + 1}
                    </td>
                    <td className="whitespace-pre">{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <code>{children.trim()}</code>
          )}
        </pre>
      </div>
    </div>
  );
};

// Inline Code
export const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="px-1.5 py-0.5 rounded bg-secondary font-mono text-sm text-foreground">
    {children}
  </code>
);

// Callout Component
interface CalloutProps {
  type?: "info" | "warning" | "error" | "success" | "note";
  title?: string;
  children: React.ReactNode;
}

export const Callout = ({ type = "info", title, children }: CalloutProps) => {
  const styles = {
    info: {
      bg: "bg-blue-500/10 border-blue-500/30",
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: title || "Info",
    },
    warning: {
      bg: "bg-yellow-500/10 border-yellow-500/30",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      title: title || "Warning",
    },
    error: {
      bg: "bg-red-500/10 border-red-500/30",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: title || "Error",
    },
    success: {
      bg: "bg-green-500/10 border-green-500/30",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      title: title || "Success",
    },
    note: {
      bg: "bg-purple-500/10 border-purple-500/30",
      icon: <Info className="w-5 h-5 text-purple-500" />,
      title: title || "Note",
    },
  };

  const style = styles[type];

  return (
    <div className={cn("my-4 p-4 rounded-xl border", style.bg)}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-1">{style.title}</p>
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
};

// API Endpoint Component
interface EndpointProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description?: string;
}

export const Endpoint = ({ method, path, description }: EndpointProps) => {
  const methodColors = {
    GET: "bg-green-500/20 text-green-400 border-green-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    PATCH: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="my-4 p-4 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-bold border",
            methodColors[method]
          )}
        >
          {method}
        </span>
        <code className="font-mono text-sm text-foreground">{path}</code>
      </div>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

// Parameter Table
interface Parameter {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

interface ParameterTableProps {
  title?: string;
  parameters: Parameter[];
}

export const ParameterTable = ({ title = "Parameters", parameters }: ParameterTableProps) => (
  <div className="my-4 rounded-xl border border-border overflow-hidden">
    {title && (
      <div className="px-4 py-2 bg-secondary/50 border-b border-border">
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
    )}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/30">
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">Required</th>
            <th className="px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, i) => (
            <tr key={param.name} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
              <td className="px-4 py-2 font-mono text-xs">{param.name}</td>
              <td className="px-4 py-2">
                <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 text-xs font-mono">
                  {param.type}
                </span>
              </td>
              <td className="px-4 py-2">
                {param.required ? (
                  <span className="text-green-500 text-xs font-medium">Yes</span>
                ) : (
                  <span className="text-muted-foreground text-xs">No</span>
                )}
              </td>
              <td className="px-4 py-2 text-muted-foreground">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Response Example
interface ResponseExampleProps {
  status: number;
  description?: string;
  children: string;
}

export const ResponseExample = ({ status, description, children }: ResponseExampleProps) => {
  const statusColors = {
    success: "bg-green-500/20 text-green-400",
    error: "bg-red-500/20 text-red-400",
    redirect: "bg-yellow-500/20 text-yellow-400",
  };

  const statusType = status >= 200 && status < 300 ? "success" : status >= 400 ? "error" : "redirect";

  return (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={cn("px-2 py-0.5 rounded text-xs font-bold", statusColors[statusType])}>
          {status}
        </span>
        {description && <span className="text-sm text-muted-foreground">{description}</span>}
      </div>
      <CodeBlock language="json">{children}</CodeBlock>
    </div>
  );
};

// Section Heading with anchor
interface HeadingProps {
  level: 1 | 2 | 3 | 4;
  id?: string;
  children: React.ReactNode;
}

export const Heading = ({ level, id, children }: HeadingProps) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const styles = {
    1: "text-4xl font-bold tracking-tight mb-4",
    2: "text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border",
    3: "text-xl font-semibold mt-8 mb-3",
    4: "text-lg font-semibold mt-6 mb-2",
  };

  return (
    <Component id={id} className={cn(styles[level], "scroll-mt-20")}>
      {children}
    </Component>
  );
};

// Step Component for tutorials
interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export const Step = ({ number, title, children }: StepProps) => (
  <div className="my-6 flex gap-4">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
        {number}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <div className="text-muted-foreground">{children}</div>
    </div>
  </div>
);

// Badge
interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error";
  children: React.ReactNode;
}

export const DocsBadge = ({ variant = "default", children }: BadgeProps) => {
  const variants = {
    default: "bg-foreground text-background",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border text-foreground",
    success: "bg-green-500/20 text-green-500 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30",
    error: "bg-red-500/20 text-red-500 border border-red-500/30",
  };

  return (
    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", variants[variant])}>
      {children}
    </span>
  );
};
