import * as React from "react";
import { API } from '@aws-amplify/api';
import { StyleSheet } from "react-nativescript";

interface Lesson {
  id: string;
  title: string;
  difficulty: string;
}

export function HomeScreen({ navigation }) {
  const [lessons, setLessons] = React.useState<Lesson[]>([]);

  React.useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await API.get('LanguageLearningAPI', '/lessons', {});
      setLessons(response);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  return (
    <flexboxLayout className="flex-1 bg-gray-100">
      <scrollView>
        <stackLayout className="p-4">
          <label className="text-2xl font-bold mb-4">Available Lessons</label>
          
          {lessons.map((lesson) => (
            <gridLayout
              key={lesson.id}
              className="bg-white p-4 rounded-lg shadow-sm mb-3"
              onTap={() => navigation.navigate("Lesson", { lessonId: lesson.id })}
            >
              <stackLayout>
                <label className="text-lg font-semibold">{lesson.title}</label>
                <label className="text-sm text-gray-600">
                  Difficulty: {lesson.difficulty}
                </label>
              </stackLayout>
            </gridLayout>
          ))}
        </stackLayout>
      </scrollView>
    </flexboxLayout>
  );
}