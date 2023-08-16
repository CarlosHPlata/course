echo "---------------------------------------------"
PRACTICE_TYPE=$(node -p "require('./practice.config.json').$1.type")
PRACTICE_FOLDER=$(node -p "require('./practice.config.json').$1.src")


CODE_TYPE="code"
TEST_GLOBAL_TYPE="test-global"
TEST_TYPE="test"
DOJO_TYPE="dojo"

TYPE="$PRACTICE_TYPE"

echo ${VAR1}

if [ "$TYPE" = "$CODE_TYPE" ]; then
    npx ts-node ${PRACTICE_FOLDER}/$2.ts

elif [ "$TYPE" = "$TEST_TYPE" ]; then
    npm test -- ${PRACTICE_FOLDER}/$2.spec.ts
    
elif [ "$TYPE" = "$TEST_GLOBAL_TYPE" ]; then
    npm test -- ${PRACTICE_FOLDER}/

elif [ "$TYPE" = "$DOJO_TYPE" ]; then
    npm test -- ${PRACTICE_FOLDER} --watch

else
    echo "No type supported"
fi
