import { CodeBlock } from "./code-block";

interface Section {
  id: string;
  title: string;
  level: number;
}

export const parseMarkdown = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  const toc: Section[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLang = '';

  lines.forEach((line, index) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
            <CodeBlock key={`code-${index}`} language={codeLang} code={codeContent.trim()} />
        );
        inCodeBlock = false;
        codeContent = '';
        codeLang = '';
      } else {
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      return;
    }
    if (inCodeBlock) {
      codeContent += line + '\n';
      return;
    }

    if (line.startsWith('#')) {
      const match = line.match(/^(#{1,3})\s+(.*)/);
      if (match) {
        const level = match[1].length;
        const title = match[2];
        const id = title.toLowerCase().replace(/[^\w]+/g, '-');
        toc.push({ id, title, level });
        
        const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
        const styles = level === 1 
            ? "hidden" // Hide H1 in content as we render it in Hero
            : level === 2 
            ? "text-3xl md:text-4xl font-display font-bold text-white mt-6 mb-6 scroll-mt-32" 
            : "text-xl md:text-2xl font-bold text-cyan-400 mt-8 mb-4 scroll-mt-32";

        elements.push(<Tag id={id} key={index} className={styles}>{title}</Tag>);
        return;
      }
    }

    const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      elements.push(
        <figure key={index} className="my-12">
            <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full rounded-lg border border-white/10" />
            <figcaption className="text-center text-slate-500 text-sm mt-4 italic">{imgMatch[1]}</figcaption>
        </figure>
      );
      return;
    }

    const parseText = (str: string) => {
        const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
             if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded font-mono text-sm">{part.slice(1, -1)}</code>;
            }
            return part;
        });
    };

    if (line.trim().length > 0 && !line.startsWith('>')) {
      elements.push(
        <p key={index} className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
          {parseText(line)}
        </p>
      );
    }
    
    if(line.startsWith('>')) {
         elements.push(
            <blockquote key={index} className="border-l-4 border-cyan-500 pl-6 py-2 my-8 text-xl italic text-slate-400 bg-white/5 p-4 rounded-r-lg">
                {line.replace('>', '').trim()}
            </blockquote>
         )
    }
  });

  return { elements, toc };
};