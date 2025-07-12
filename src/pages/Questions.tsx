
import React from 'react';
import { ArrowLeft, FileQuestion, MessageSquare, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Questions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Button>
            <h1 className="text-2xl font-bold text-foreground">All Kinds of Questions</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Forms & Questionnaires Coming Soon
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This section will contain various forms and questionnaires to help you create even better content for your zines.
          </p>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-sage-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileQuestion className="w-6 h-6 text-sage-green" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Content Surveys</h3>
            <p className="text-sm text-muted-foreground">
              Interactive surveys to help brainstorm and organize your zine content
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-lavender/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-lavender" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Feedback Forms</h3>
            <p className="text-sm text-muted-foreground">
              Collect feedback from readers to improve your future publications
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-dusty-rose/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-6 h-6 text-dusty-rose" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Reader Surveys</h3>
            <p className="text-sm text-muted-foreground">
              Understand your audience better with targeted questionnaires
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Stay Tuned!
          </h3>
          <p className="text-muted-foreground mb-4">
            We're working hard to bring you powerful form and survey tools to enhance your zine creation experience.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Continue Creating Your Zine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
