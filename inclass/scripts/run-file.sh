echo "---------------------------------------------"
PRACTICE_FOLDER=$(node -p "require('./practice.config.json').$1.src")

npx ts-node ${PRACTICE_FOLDER}/$2.ts