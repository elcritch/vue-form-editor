

# for f in `ls src/fields/core/*.vue src/fields/optional/*.vue `; do
for f in `ls src/*.vue `; do
  echo "File: " $f

  pup -p 'template text{}' < $f | ruby -pe '$_.lstrip!' > $f.pug

  pug -P -O '{"doctype": "vue"}' $f.pug

  # tidy -iq -m $f.html

  sed '/\<template lang="pug"/,/\<\/template/d' $f > $f.notemplate

  echo '<template lang="html">' > $f.vue
  cat $f.html >> $f.vue
  echo '\n</template>' >> $f.vue
  cat $f.notemplate >> $f.vue

  # mv $f.v2 $f

done
