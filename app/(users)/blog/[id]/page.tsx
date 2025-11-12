import { getSingleBlog } from '@/lib/api';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getSingleBlog(id);
  const { title, subTitle, description, image, category, createdAt } = blog;

  // Format date
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Estimate reading time (rough calculation)
  const estimateReadingTime = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" size="sm" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Category Badge */}
        {category && (
          <Badge variant="secondary" className="mb-4">
            {category}
          </Badge>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-6">
          {subTitle}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          {createdAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={new Date(createdAt).toISOString()}>
                {formatDate(createdAt)}
              </time>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{estimateReadingTime(description)} min read</span>
          </div>
        </div>

        {/* Featured Image */}
        {image && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mb-12 ring-1 ring-border">
            <Image
              src={image}
              fill
              alt={title}
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}
      </header>

      {/* Content Section */}
      <section className="mx-auto px-4 pb-16 max-w-4xl">
        <div className="p-2 md:p-4">
          <div
            className="prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-base prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-img:rounded-lg prose-img:shadow-md
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1
              prose-ul:my-4 prose-ol:my-4
              prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="container mx-auto px-4 pb-16 max-w-4xl">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-8 text-center border border-primary/20">
          <h3 className="text-2xl font-bold mb-2">Enjoyed this article?</h3>
          <p className="text-muted-foreground mb-6">
            Check out more amazing content on our blog
          </p>
          <Link href="/">
            <Button size="lg" className="gap-2">
              Explore More Articles
            </Button>
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default BlogDetails;