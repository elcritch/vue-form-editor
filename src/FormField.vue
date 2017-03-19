<template lang="html">
  <div class="">

    <div slot="component" class="card-content is-fullwidth">

        <label>{{header.key}}</label>

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
      header: Object
		},

		data () {
			return {
			};
		},

		methods: {

      handleChange(value) {
        console.log(value);
      },

      // Clear validation errors
			clearValidationErrors() {
				this.errors.splice(0);

				each(this.$children, (child) => {
          if ("clearValidationErrors" in child)
  					child.clearValidationErrors();
				});
			},

      handleClick(tab, event) {
  			console.log(tab, event);
  		},

			// Validating the model properties
			validate() {
				this.clearValidationErrors();

				this.$children.forEach((child) => {
					if (isFunction(child.validate))
					{
						let errors = child.validate(true);
						errors.forEach((err) => {
							this.errors.push({
								field: child.schema,
								error: err
							});
						});
					}
				});

				let isValid = this.errors.length == 0;
				this.$emit("validated", isValid, this.errors);
				return isValid;
			},

		}
	};

</script>
