<template lang="html">
  <div class="">
    <div slot="component" class="card-content is-fullwidth">
      <label>{{name}}</label>
      <div class="field-wrap"> </div>
    </div>
  </div>
</template>

<script>

  import DropBox from './DropBox.vue'

	import {each, isFunction, isNil, isArray, isString} from "lodash";
  import Vue from 'vue';

	export default {

    model: {
      prop: 'property',
      event: 'change'
    },


		components: {
      DropBox
    },

		props: {
      property: Object,
      name: String
		},

		data () {
			return {
      }
		},

		methods: {

      handleChange(value) {
        console.log(value);
      },

		}
	};

</script>
