import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, MessageSquare, ThumbsUp, ThumbsDown, Bold, Italic, Link, Quote, Reply, ChevronDown, ChevronUp, List, ListOrdered, Code, Heading, AtSign, Hash, CornerUpLeft, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Comment {
  id: number;
  user: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

// Adicionando mais respostas para testar a funcionalidade 'Ver mais'
const dummyReplies: Comment[] = [
  {
    id: 4,
    user: "MangaReader_X",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    timestamp: "Há 1 hora",
    content: "Concordo plenamente! A coreografia da luta foi de tirar o fôlego. Melhor capítulo do arco!",
    likes: 15,
    dislikes: 0,
  },
  {
    id: 5,
    user: "AnimeLover_22",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    timestamp: "Há 45 minutos",
    content: "Será que o autor vai introduzir um novo vilão no próximo capítulo? Estou ansioso!",
    likes: 8,
    dislikes: 1,
  },
  {
    id: 6,
    user: "OldSchoolFan",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    timestamp: "Há 30 minutos",
    content: "Prefiro os arcos antigos, mas este está aceitável. A arte continua impecável.",
    likes: 5,
    dislikes: 0,
  },
];

const dummyComments: Comment[] = [
  {
    id: 1,
    user: "JusticeiroFan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    timestamp: "Há 2 horas",
    content: "Capítulo incrível! A luta final foi épica, mal posso esperar pela próxima semana. O autor realmente superou as expectativas.",
    likes: 45,
    dislikes: 2,
    replies: dummyReplies,
  },
  {
    id: 2,
    user: "MangaGeek_99",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    timestamp: "Há 1 dia",
    content: "Achei que a progressão do personagem principal está um pouco lenta. Espero que ele ganhe um power-up logo.",
    likes: 12,
    dislikes: 5,
  },
  {
    id: 3,
    user: "PremiumReader",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    timestamp: "Há 3 dias",
    content: "Leitura offline é uma benção. Vale cada centavo do Premium!",
    likes: 88,
    dislikes: 1,
  },
];

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  hasMoreReplies?: boolean;
  onToggleReplies?: () => void;
  showReplies?: boolean;
  isLastReply?: boolean; // Novo prop para ajudar na linha de hierarquia
}

const CommentItem = ({ comment, isReply = false, hasMoreReplies = false, onToggleReplies, showReplies, isLastReply = false }: CommentItemProps) => {
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  const handleLike = () => {
    if (userLiked) {
      setLikes(prev => prev - 1);
      setUserLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setUserLiked(true);
      if (userDisliked) {
        setDislikes(prev => prev - 1);
        setUserDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setDislikes(prev => prev - 1);
      setUserDisliked(false);
    } else {
      setDislikes(prev => prev + 1);
      setUserDisliked(true);
      if (userLiked) {
        setLikes(prev => prev - 1);
        setUserLiked(false);
      }
    }
  };

  return (
    <div className={cn(
      "flex flex-col gap-4 p-4 transition-colors duration-300",
      isReply ? "bg-secondary/30" : "bg-card/50 border-b border-border/30 last:border-b-0"
    )}>
      <div className="flex gap-3 relative">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img 
            src={comment.avatarUrl} 
            alt={comment.user} 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/50 shadow-md"
          />
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground font-display uppercase tracking-wide text-sm">{comment.user}</span>
            <span className="text-xs text-muted-foreground">• {comment.timestamp}</span>
          </div>
          <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{comment.content}</p>
          
          {/* Actions */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button 
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 transition-colors",
                userLiked ? "text-primary font-bold" : "hover:text-primary"
              )}
            >
              <ThumbsUp className={cn("w-4 h-4", userLiked && "fill-primary")} />
              {likes}
            </button>
            <button 
              onClick={handleDislike}
              className={cn(
                "flex items-center gap-1 transition-colors",
                userDisliked ? "text-primary font-bold" : "hover:text-primary"
              )}
            >
              <ThumbsDown className={cn("w-4 h-4", userDisliked && "fill-primary")} />
              {dislikes}
            </button>
            <button className="flex items-center gap-1 hover:text-foreground transition-colors font-medium">
              <Reply className="w-4 h-4" />
              Responder
            </button>
          </div>
        </div>
      </div>

      {/* Nested Replies Container */}
      {comment.replies && comment.replies.length > 0 && (
        <div className={cn(
          "relative mt-2",
          !isReply && "ml-4 sm:ml-8" // Indent replies only for top-level comments
        )}>
          {/* Vertical Hierarchy Line - Complex Connector */}
          <div className="absolute top-0 left-0 w-px h-full bg-border/50" />
          
          {/* Replies List */}
          <div className="pl-4 space-y-2">
            {(showReplies ? comment.replies : comment.replies.slice(0, 1)).map((reply, index, arr) => {
              const isCurrentLastReply = index === arr.length - 1;
              
              return (
                <div key={reply.id} className="relative">
                  {/* Custom Connector Line */}
                  <div className="absolute top-0 left-0 w-4 h-14">
                    <div className="absolute top-0 left-0 w-px h-full bg-border/50" />
                    <div className="absolute top-5 left-0 w-4 h-px bg-border/50" />
                    <div className="absolute top-5 left-4 w-px h-5 bg-border/50" />
                    {/* Corner curve effect */}
                    <div className="absolute top-5 left-0 w-4 h-4 border-l border-b border-border/50 rounded-bl-lg" />
                    {/* Hide vertical line segment if it's the last visible reply and replies are not expanded */}
                    {isCurrentLastReply && !showReplies && (
                      <div className="absolute top-5 left-0 w-px h-full bg-secondary/30" />
                    )}
                  </div>
                  
                  <div className="pl-4">
                    <CommentItem 
                      comment={reply} 
                      isReply={true} 
                      isLastReply={isCurrentLastReply}
                    />
                  </div>
                </div>
              );
            })}

            {/* "Ver mais" button */}
            {hasMoreReplies && onToggleReplies && (
              <button
                onClick={onToggleReplies}
                className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors ml-4 pt-2"
              >
                {showReplies ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Ocultar respostas
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Ver mais {comment.replies.length - 1} respostas
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const RichTextToolbar = () => (
  <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-card rounded-t-xl overflow-x-auto scrollbar-hide">
    <ToggleGroup type="multiple" size="sm" className="gap-0.5 flex-shrink-0">
      <ToggleGroupItem value="heading" aria-label="Toggle heading" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <Heading className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="bold" aria-label="Toggle bold" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="code" aria-label="Toggle code" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <Code className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="link" aria-label="Toggle link" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <Link className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Toggle list" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list-ordered" aria-label="Toggle ordered list" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <ListOrdered className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="quote" aria-label="Toggle quote" className="h-8 w-8 p-0 data-[state=on]:bg-primary/20 data-[state=on]:text-primary hover:bg-secondary/50">
        <Quote className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    
    {/* Right side icons */}
    <div className="flex items-center gap-1 ml-auto flex-shrink-0">
      <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-secondary/50">
        <AtSign className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-secondary/50">
        <Hash className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-secondary/50">
        <CornerUpLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-secondary/50">
        <Paperclip className="h-4 w-4" />
      </Button>
    </div>
  </div>
);


const CommentSection = ({ mangaTitle }: { mangaTitle: string }) => {
  const [commentText, setCommentText] = useState('');
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim().length < 5) {
      toast.error("O comentário deve ter pelo menos 5 caracteres.");
      return;
    }
    
    // Simulação de envio
    toast.success("Comentário enviado! Aguardando moderação.");
    setCommentText('');
  };

  const toggleReplies = (commentId: number) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <section id="comentarios" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-impact tracking-wider mb-8 text-foreground flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          Comentários ({dummyComments.length})
        </h2>

        {/* Comment Submission Form with RTE Toolbar */}
        <div className="mb-10 border border-border/50 rounded-xl shadow-lg bg-card/80 overflow-hidden">
          <RichTextToolbar />
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            <h3 className="text-lg font-display uppercase tracking-wide text-foreground">
              Deixe seu comentário sobre {mangaTitle}
            </h3>
            <Textarea
              placeholder="Escreva sua opinião, teoria ou crítica..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              // Removendo a borda e ajustando o fundo
              className="min-h-[100px] bg-background/50 border-none focus-visible:ring-primary focus-visible:border-none"
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider"
                disabled={commentText.trim().length < 5}
              >
                Enviar Comentário
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Comment List - Cleaned up styling */}
        <div className="border border-border/50 rounded-xl shadow-xl bg-card/80 overflow-hidden">
          {dummyComments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              hasMoreReplies={comment.replies && comment.replies.length > 1}
              onToggleReplies={() => toggleReplies(comment.id)}
              showReplies={expandedComments[comment.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;