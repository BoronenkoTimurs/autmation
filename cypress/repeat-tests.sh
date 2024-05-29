for i in {1..10}

do
  echo "Test $i"
  npx cypress run --spec "cypress/e2e/spec.cy.js"
  echo "Test $i done!"
done