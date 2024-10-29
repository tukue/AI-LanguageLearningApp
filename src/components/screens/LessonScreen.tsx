import * as React from "react";
import { API } from '@aws-amplify/api';
import { StyleSheet } from "react-nativescript";

export function LessonScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const [lesson, setLesson] = React.useState(null);
  const [translation, setTranslation] = React.useState("");

  React.useEffect(() => {
    fetchLessonDetails();
  }, [lessonId]);

  const fetchLessonDetails = async () => {
    try {
      const response = await API.get('LanguageLearningAPI', `/lessons/${lessonId}`, {});
      setLesson(response);
    } catch (error) {
      console.error("Error fetching lesson details:", error);
    }
  };

  const translateText = async (text: string) => {
    try {
      const response = await API.post('LanguageLearningAPI', '/translate', {
        body: { text }
      });
      setTranslation(response.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  if (!lesson) return <activityIndicator busy={true} />;

  return (
    <flexboxLayout className="flex-1 p-4 bg-white">
      <stackLayout>
        <label className="text-2xl font-bold mb-4">{lesson.title}</label>
        <label className="text-lg mb-4">{lesson.content}</label>
        
        <button
          className="bg-blue-500 text-white p-3 rounded mb-4"
          onTap={() => translateText(lesson.content)}
        >
          Translate
        </button>
        
        {translation && (
          <label className="text-lg text-gray-700 p-4 bg-gray-100 rounded">
            {translation}
          </label>
        )}
      </stackLayout>
    </flexboxLayout>
  );
}