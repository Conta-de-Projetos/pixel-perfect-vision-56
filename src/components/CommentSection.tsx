import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Comment {
  id: number;
  user: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  likes: number;
  dislikes: number;
}

const dummyComments: Comment[] = [
  {
    id: 1,
    user: "JusticeiroFan",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    timestamp: "Há 2 horas",
    content: "Capítulo incrível! A luta final foi épica, mal posso esperar pela próxima semana. O autor realmente superou as expectativas.",
    likes: 45,
    dislikes: 2,
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

const CommentItem = ({ comment }: { comment: Comment }) => {
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
    <div className="flex gap-4 p-4 bg-card/50 border-b border-border/50 last:border-b-0">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img 
          src={comment.avatarUrl} 
          alt={comment.user} 
          className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
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
          <button className="flex items-center gap-1 hover:text-foreground transition-colors">
            Responder
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ mangaTitle }: { mangaTitle: string }) => {
  const [commentText, setCommentText] = useState('');

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

  return (
    <section id="comentarios" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-impact tracking-wider mb-8 text-foreground flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          Comentários ({dummyComments.length})
        </h2>

        {/* Comment Submission Form */}
        <div className="mb-10 p-6 brutal-card bg-card/80">
          <h3 className="text-lg font-display uppercase tracking-wide mb-4 text-foreground">
            Deixe seu comentário sobre {mangaTitle}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Escreva sua opinião, teoria ou crítica..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px] bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:border-primary"
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

        {/* Comment List */}
        <div className="border border-border/50 rounded-lg shadow-inner bg-background/20 brutal-card overflow-hidden">
          {dummyComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentSection;