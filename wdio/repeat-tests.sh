for i in {1..10}

do
  echo "Test $i"
  npx wdio run wdio.conf.js --logLevel info --outputDir=./allure-results/run_$i
  echo "Test $i done!"
done
