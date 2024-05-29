rm -rf ./allure-results/combined/*

mkdir -p ./allure-results/combined

for i in {1..10}
do
  echo "Combining test $i"
  cp -r ./allure-results/run_$i/* ./allure-results/combined/
  echo "Combining test $i done!"
done