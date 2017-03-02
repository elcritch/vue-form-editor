

# for f in `ls src/fields/core/*.vue src/fields/optional/*.vue | grep -v '.vue.vue'`; do
for f in `ls src/formGenerator.vue `; do
  echo "File: " $f

  pup -p 'template text{}' < $f | sed '/^$/d' | ruby -pe '$_.gsub!(/^\t/,"")' > $f.pug

  # cat $f.pug |  >  $f.pug2

  pug -P -O '{"doctype": "vue"}' $f.pug

  # tidy -iq -m $f.html

  sed '/\<template lang="pug"/,/\<\/template/d' $f > $f.notemplate

  echo '<template lang="html">' > $f.vue
  cat $f.html | sed '/^$/d' | ruby -pe 'print "  "' >> $f.vue
  echo '</template>' >> $f.vue
  cat $f.notemplate >> $f.vue

  # mv $f.v2 $f

done
