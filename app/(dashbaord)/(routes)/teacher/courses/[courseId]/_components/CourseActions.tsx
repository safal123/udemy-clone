'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, Loader2, Trash, TriangleAlert } from 'lucide-react';
import ConfirmModal from '@/components/shared/ConfirmModal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Course } from '.prisma/client';

interface CourseActionsProps {
  course: Course;
  courseId: string;
  isDisabled?: boolean;
}

const CourseActions = ({ course, courseId, isDisabled = false }: CourseActionsProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCourseDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success('Course deleted');
      await router.push(`/teacher/courses`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCoursePublishToggle = async () => {
    setLoading(true);
    try {
      const url = course.isPublished
        ? `/api/courses/${courseId}/unpublish`
        : `/api/courses/${courseId}/publish`;
      await axios.patch(url);
      toast.success('Course updated');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (isPublished: boolean) => {
    if (loading) return <Loader2 className="h-4 w-4 animate-spin" />;
    return isPublished
      ? <CheckIcon className="h-4 w-4" />
      : <TriangleAlert className="h-4 w-4" />;
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={isDisabled || loading}
        onClick={handleCoursePublishToggle}
        size="sm"
        variant={course.isPublished ? 'destructive' : 'outline'}
        className="flex items-center gap-x-1"
      >
        {renderIcon(course.isPublished)}
        {course.isPublished ? 'Unpublish' : 'Publish'}
      </Button>

      <ConfirmModal onConfirm={handleCourseDelete}>
        <Button size="sm" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
