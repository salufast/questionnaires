## Salufast Questionnaires Project

The user should be able to answer multiple questions in form of a questionnaire via the app. The answers are written to the backend and are the basis for different evaluations.

We use a graphql api provided by hasura in the backend and apollo client in the frontend. The target system of this app is our development environment.

We want to rework three questionnaires of our app first:
- Lark owl test: a test for figuring out whether one should skip breakfast or dinner when fasting
- Fasting protocol: questions that should be answered on every day while doing a fasting period of 5 days
- WHO5 well-being index: a questionnaire about the wellbeing of an individual of the last 2 weeks

#

## Design

The design of the questionnaires should take inspiration from https://dribbble.com/shots/17991923-Food-tracker-app-survey (after the login screen).

With some adjustments regarding our corporate design the questionnaires look roughly like this: https://www.figma.com/file/Ra86b8bn8eBJNWw0KlSmzI/Untitled?type=design&node-id=0%3A1&t=98iRbyOg3NardKQQ-1

Not shown in the last mockup but also wanted is the question stack seen in the first mockup (when there are multple questions after the current one you can see the bottom of the next two questions under the currently shown one, when there is only on question left only one question is located under the current one and when no question is left only the current question is displayed).

#

## Animations

As shown in the mockup the questionnaires should be animated. This includes:

- When pressing on an answer the color change indicating the selected answer should fade in / out.
- When pressing "next" the current question should swipe to the left and the next question comes up.
- The former motion indicates the the user can swipe the question to the left on his own with dragging the question to the left edge of the screen. With this action the user skips the current question (this should be an optional parameter for a questionnaire, not all questionnaires contain questions that are skippable).
- After answering the last question a last screen is shown with the tests result. The white space previously containing the question now shrinks to the height of the test results text.

#

## Apollo Cache

When inserting, updating or deleting any data (like answers to questions) the changes should be displayed immediately instead of waiting for the server response. For that we we use optimisticResponse and update of apollos useMutation (https://www.apollographql.com/docs/react/data/mutations#the-update-function).

#

## Notes

- The texts are in english for development purposes. They will be translated to german later.
- "Last Title" is the title of the last screen, that you can get via react-navigation.
- The result of the WHO5 score uses a graph. In our app we use victory-native (https://github.com/FormidableLabs/victory-native) for diagrams so use that library if applicable and if it does not cause too much headache.
- Questions where multiple answers are allowed should display a checkbox instead of a radio button.