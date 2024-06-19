type ScannerType = "source" | "binary" | "dependency";
type PathType = "text" | "dir" | "file";

interface PathInfo {
  type: PathType;
  path: string;
}

interface AnalyzeCommandConfig {
  mode?: ScannerType[]; // default: ['source', 'binary', 'dependency'] (all)
  // path?: string[]; // default: '.' (current directory)
  // link?: string[]; // default: ''
  subjects?: PathInfo[];
  exclusions?: PathInfo[];
  outputFormat?: "excel" | "yaml"; // default: ['excel']
  outputPath?: string; // default: '.' (current directory)
  outputFileName?: string;
  extraOptions?: string; // "-r -d "-a 'source /test/Projects/venv/bin/activate' -d 'deactivate'" -c"
}

interface CompareCommandConfig {
  reports?: [string, string]; // [path/to/report1, path/to/report2]
  outputFormat?: "excel" | "json" | "yaml" | "html"; // default: ['excel']
  outputPath?: string; // default: '.' (current directory)
  outputFileName?: string;
}

type CommandConfig = AnalyzeCommandConfig | CompareCommandConfig;

interface AnalyzeCommand {
  type: "analyze";
  config: AnalyzeCommandConfig;
}

interface CompareCommand {
  type: "compare";
  config: CompareCommandConfig;
}

type Command = AnalyzeCommand | CompareCommand;

interface CommandResponse {
  success: boolean; // final success of several jobs
  message?: string; // success message or error message
  data?: any; // current usage is string array of successfully scanned paths; ['home/test', 'foo/bar']
}

interface Setting {
  path: string[];
  link: string[];
  dep_argument: string;
  outputDir: string;
  outputFile: string;
  exclude_path: string[];
  format: string;
  db_url: string;
  timer: boolean;
  raw: boolean;
  core: number;
  no_correction: boolean;
  correct_fpath: string;
  ui: boolean;
  type: "compare" | "analyze";
}

interface ICommandManager {
  executeCommand: (command: Command) => Promise<CommandResponse>;
}
