import React, { useState } from 'react';
import { COMMENTS } from '../data/sampleData';
import { commentsStorage, generateId } from '../utils/storage';
import { timeAgo, getCurrentISOString } from '../utils/time';
import type { Comment } from '../types';

/**
 * CommentsFeed component props
 */
interface CommentsFeedProps {
  className?: string;
}

/**
 * CommentsFeed component with existing comments and add comment form
 */
export const CommentsFeed: React.FC<CommentsFeedProps> = ({ className = '' }) => {
  const [comments, setComments] = useState<Comment[]>(() => {
    const storedComments = commentsStorage.getArray();
    // If no stored comments, use sample data
    return storedComments.length > 0 ? storedComments : COMMENTS;
  });

  const [newComment, setNewComment] = useState({ name: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; text?: string } = {};

    if (!newComment.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (newComment.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!newComment.text.trim()) {
      newErrors.text = 'Comment is required';
    } else if (newComment.text.trim().length < 10) {
      newErrors.text = 'Comment must be at least 10 characters';
    } else if (newComment.text.trim().length > 500) {
      newErrors.text = 'Comment must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const comment: Comment = {
        id: generateId(),
        name: newComment.name.trim(),
        text: newComment.text.trim(),
        date: getCurrentISOString(),
      };

      // Add to storage (prepend to show newest first)
      commentsStorage.prepend(comment);
      
      // Update local state
      setComments(prev => [comment, ...prev]);
      
      // Reset form
      setNewComment({ name: '', text: '' });
      setErrors({});

      // Track analytics
      if (window.trackEvent) {
        window.trackEvent('comment_posted', {
          comment_length: comment.text.length,
          name_length: comment.name.length,
        });
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: 'name' | 'text', value: string) => {
    setNewComment(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  React.useEffect(() => {
    if (window.trackEvent) {
      window.trackEvent('comments_section_view', {
        total_comments: comments.length,
      });
    }
  }, [comments.length]);

  return (
    <section className={`section bg-gray-50 ${className}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="mb-4">Համայնքի կարծիքները</h2>
            <p className="text-lg text-secondary">
              Տեսեք ինչ են ասում մյուսները և կիսվեք ձեր կարծիքով մեր դրիլի մասին։
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-2xl font-bold text-primary-600">{comments.length}</span>
              <span className="text-secondary">մեկնաբանություն իրական հաճախորդներից</span>
            </div>
          </div>

          {/* Add comment form */}
          <div className="card mb-12">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-4">Կիսվեք ձեր մտքերով</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="field">
                    <label htmlFor="comment-name" className="field-label">
                      Ձեր անունը *
                    </label>
                    <input
                      id="comment-name"
                      type="text"
                      value={newComment.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`input ${errors.name ? 'error' : ''}`}
                      placeholder="Մուտքագրեք ձեր անունը"
                      maxLength={50}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <span className="field-error">{errors.name}</span>
                    )}
                  </div>

                  {/* Character count */}
                  <div className="md:flex md:items-end md:pb-4">
                    <div className="text-sm text-secondary">
                      <span className={newComment.text.length > 450 ? 'text-warning-600' : ''}>
                        {newComment.text.length}/500 characters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment field */}
                <div className="field">
                  <label htmlFor="comment-text" className="field-label">
                    Ձեր մեկնաբանությունը *
                  </label>
                  <textarea
                    id="comment-text"
                    value={newComment.text}
                    onChange={(e) => handleInputChange('text', e.target.value)}
                    className={`input textarea ${errors.text ? 'error' : ''}`}
                    placeholder="Կիսվեք ձեր փորձառությամբ մեր դրիլի հետ..."
                    rows={4}
                    maxLength={500}
                    disabled={isSubmitting}
                  />
                  {errors.text && (
                    <span className="field-error">{errors.text}</span>
                  )}
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-secondary">
                    Ձեր մեկնաբանությունը կհայտնվի անմիջապես հրապարակելուց հետո:
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && <div className="spinner mr-2" />}
                    {isSubmitting ? 'Հրապարակվում է...' : 'Հրապարակել'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Comments list */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="card hover:shadow-md transition-shadow duration-300">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Name and time */}
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{comment.name}</h4>
                        <span className="text-sm text-secondary">
                          {timeAgo(comment.date)}
                        </span>
                        
                        {/* New comment indicator */}
                        {new Date(comment.date).getTime() > Date.now() - (24 * 60 * 60 * 1000) && (
                          <span className="badge badge-primary text-xs">Նոր</span>
                        )}
                      </div>

                      {/* Comment text */}
                      <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No comments state (shouldn't show with sample data) */}
          {comments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Դեռ մեկնաբանություններ չկան</h3>
              <p className="text-secondary">Լինեք առաջինը, ով կկիսվի իր մտքերով մեր դրիլի մասին:</p>
            </div>
          )}

          {/* Footer note */}
          <div className="text-center mt-12">
            <p className="text-sm text-secondary">
              Մեկնաբանությունները իրական հաճախորդներից են։ Մենք չենք խմբագրում կամ հեռացնում ազնիվ արձագանքները:
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};