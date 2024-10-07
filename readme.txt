כדי שהקובץ יעבוד מימין לשמאל יש ללחוץ בתוך קובץ ה-(Ctrl+right Shift) readme.txt 

//--------------------------------------------------------------------

שלום לכולם,
כאן אציג לכן את משמעות הפרויקט והערות חשובות.
אכתוב מה המשמעות של כל קובץ.

//--------------------------------------------------------------------

הפרויקט מהווה את צד השרת של מערכת ניהול הכרטיסים שפותחה בצד הלקוח.
המטרה העיקרית היא לנהל את הבקשות שמגיעות מהלקוח,
להתחבר למסדי הנתונים השונים, ולספק APIs שמאפשרים לבצע פעולות שונות על הכרטיסים.
הפרויקט תוכנן להיות גמיש ולהתאים את עצמו לשימושים נוספים,
כך שניתן יהיה להשתמש בו לצד לקוחות שונים בקלות.

//--------------------------------------------------------------------

הערות חשובות:
1)הפרויקט הוא צד השרת של הכרטיסים אבל הוא גם הבסיס לכל צד שרת אחר, כלומר 
אם נסיר את התיקיות של האובייקטים:
cards ו- users
אז שאר הדברים יהיו בסיס לכל צד שרת אחר, לכן הפרויקט גמיש לעבוד עם פרויקטים אחרים
כמובן שאם נרצה להשתמש בפרויקט לצד לקוח אחר, נצטרך ליצור תיקיות לאובייקטים,
כמו תיקיית cards ו- users
2)הפרויקט עובד בשני סביבות עבודה, סביבה לוקאלית
וסביבה חיצונית, כלומר השרת הוא באוויר עם תוכנת אטלסץ
אז אפשר להריץ אותו מקומית עם מונגו ובאוויר/רשת/אינטרנט עם אטלס.
3)יש אוטנטיקציה לכל בקשה, אז אם אתם רוצים לשנות משהו במשתמש שלכם,
שימו לב שאתם לא משנים למצב משתמש שיחסום אותכם מלבצע פעולות למשל:
עם שיניתם משתמש עסקי למשתמש שאינו עסקי לא תוכלו יותר ליצור כרטיסים אז שימו לב לזה.
4)לפרויקט יש כמה משתנים שהם סודיים אז אם תרצו שהפרויקט יעבוד בצורה מושלמת תצטרכו ליצור קובץ env
בתוך קובץ env יש ליצור שני משתנים:
JWT_SECRET
ATLAS_CONNECTION_STRING
הסיסמא/קוד של jwt יכולה להיות מה שתרצו
אטלס הוא כדי להתחבר לשרת בצורה גלובלית
אך תצטרכו לפתוח מסד נתונים בעצמכם באמצעות אטלס ולקבל את הכתובת לחיבור משלכם

//--------------------------------------------------------------------

?איך להתקין את הפרוייקט
1)התקינו את התוכנה visual studio code
2)קחו את תיקיית cards project מגיטאהב ושימו אותה ב - visual studio code in as a folder
3)פתחו את הטרמינל וודאו שאתם נמצאים בתיקיית הפרויקט, חשוב אחרת האתר לא יעבוד, ודאו שאתם ב correct path
אם אתם לא בpath הנכון רשמו את הפקודה cd ואת התיקייה של הפרויקט לדוגמה:
PS C:\Users\owner\Desktop\nadav\studies\מבחנים\קורסמורחב\reactProject>
לא path נכון לכן נוסיף cd cards project
או cd and tab button until you reach the right folder
4)לאחר מכן רשמו את הפעולות הבאות בסדר הבא:
npm install
npm run or
npm start
הנקודה בפעולה הראשונה מוודאת שהכל מותקן בתיקייה הנכונה
5)לחצו על הקישור שנוצר בטרמינל בעזרת ctrl + קליק שמאלי בעכבר
6)כדי להתחיל את הפרויקט במצב לוקאלי
npm run dev
כדי להתחיל את הפרויקט במצב גלובלי
npm start
//--------------------------------------------------------------------

כתובת הדוקומנטציה של השרת:
users: https://documenter.getpostman.com/view/37787391/2sAXxLAYym
cards: https://documenter.getpostman.com/view/37787391/2sAXxJjbVP

//--------------------------------------------------------------------

מבנה הפרויקט

|- auth
-- |- providers
------ |- jwt.js
-- |- authService.js

|- cards
-- |- helpers
------ |- generateBizNumber.js
------ |- normalizeCard.js
-- |- models
------ |- mongodb
-------------|- Card.js
------ |- cardsAccessDataService.js
-- |- routes
------ |- cardsRestController.js
-- |- validation
------ |- joi
-------------|- validateCardWithJoi.js
------ |- cardValidationService.js

|- congfig
-- |-default.json
-- |-development.json
-- |-production.json

|- DB
-- |- mongodb
------ |- connectToAtlas.js
------ |- connectToMongodbLocally.js
-- |- dbService.js

|- helpers
-- |- mongodb
------ |- Address.js
------ |- Image.js
------ |- mongooseValidators.js
------ |- Name.js

|- logger
-- |- loggers
------ |- morganLogger.js
-- |- loggerService,js

|- middlewares
-- |- cors.js

|- router
-- |- router.js

|- users
-- |- helpers
------ |- bcrypt.js
------ |- normalizeUser.js
-- |- models
------ |- mongodb
-------------|- User.js
------ |- usersAcessDataService.js
-- |- routes
------ |- usersRestController.js
-- |- validation
------ |- joi
-------------|- editUserValidation.js
-------------|- loginValidation.js
-------------|- registerValidation.js
------ |- userValidationService.js

|- utils
-- |- handleErrors.js
-- |- timeHelper.js

|- app.js

//--------------------------------------------------------------------

הסבר על הקבצים

תיקיית auth
jwt.js - אחראי על יצירה ואימות של JWT לצורך אוטנטיקציה.
authService.js - מנהל את הלוגיקה של האוטנטיקציה.

תיקיית cards
generateBizNumber.js - פונקציה ליצירת מספרי כרטיסי עסק רנדומלים.
normalizeCard.js - נורמליזציה של נתוני כרטיסים כדי להבטיח פורמט אחיד.
Card.js - מגדיר את הסכמה והמודל של הכרטיסים עבור MongoDB.
cardsAccessDataService.js - מכיל פונקציות לגישה לנתוני כרטיסים במסד הנתונים.
cardsRestController.js - מגדיר את המסלולים ולטפל בפניות API שקשורות לכרטיסים.
validateCardWithJoi.js - משתמש ב-Joi כדי לאמת נתוני כרטיסים לפי כללים מוגדרים מראש.
cardValidationService.js - מנהל את הלוגיקה לאימות כרטיסים.

תיקיית config
default.json - קונפיגורציה ברירת מחדל
development.json - קונפיגורציה לסביבת פיתוח.
production.json - קונפיגורציה לסביבת מוצר(העלאה לאוויר).

תיקיית DB
connectToAtlas.js - מתחבר למסד נתונים MongoDB Atlas עבור גישה בענן.
connectToMongodbLocally.js - מתחבר מסד נתונים MongoDB מקומי.
dbService.js - מכיל פונקציות חיבור למסד הנתונים

תיקיית helper
Address.js - מודל לטיפול בכתובות.
Image.js - מודל לטיפול בתמונות.
mongooseValidators.js - מאמתים מותאמים אישית עבור סכמות Mongoose.
Name.js - מודל לטיפול בשמות.

תיקיית logger
morganLogger.js - פונקציה שמשלבת את Morgan לרישום בקשות לשרת עם מידע מפורט על הבקשות.
loggerService,js - מספק שירותי רישום כלליים , כולל החזרת הלוגר.

תיקיית middlewares
cors.js - קונפיגורציה של CORS עבור האפליקציה.

תיקיית router
router.js - קובץ רוטציה מרכזי שמחבר בין מסלולים שונים(cards ו- users).

תיקיית users
bcrypt.js - פונקציה להצפנת סיסמאות באמצעות bcrypt.
normalizeUser.js - נורמליזציה של נתוני משתמשים כדי להבטיח פורמט אחיד.
User.js - מגדיר את הסכמה והמודל של המשתמשים עבור MongoDB.
usersAcessDataService.js - מכיל פונקציות לגישה לנתוני משתמשים במסד הנתונים.
usersRestController.js - מגדיר את המסלולים ולטפל בפניות API שקשורות למשתמשים.
editUserValidation.js - מאמת נתונים כאשר עורכים משתמש.
loginValidation.js - מאמת נתוני כאשר מנסים להתחבר.
registerValidation.js - מאמת נתוני כאשר מנסים להירשם.
userValidationService.js - מנהל את הלוגיקה לאימות משתמשים.

תיקיית utils
handleErrors.js - פונקציה לניהול שגיאות
timeHelper.js - פונקציה לרישום נכון של זמנים

app.js - הקובץ הראשי שכל המידלוורס נמצאים בו כולל פונקציה האזנה זמפעילה בעצם את הצד שרת