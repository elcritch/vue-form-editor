<template lang="html">
  <div class="">

    <div slot="component" class="card-content is-fullwidth">

      <!-- <div class="form-group" v-if="fieldVisible(field)" :class="getFieldRowClasses(field)"> -->
        <label>{{name}}</label>

        <div class="field-wrap">
          <!-- <component :is="getFieldType(field)"
              :disabled="fieldDisabled(field)"
              :model="model"
              :schema.sync="field"
              @model-updated="modelUpdated"
              @validated="onFieldValidated">
          </component> -->
          <!-- <div class="buttons" v-if="buttonVisibility(field)">
            <button v-for="btn in field.buttons" @click="btn.onclick(model, field)" :class="btn.classes">
              {{ btn.label }}
            </button>
          </div> -->
        </div>
        <!-- <div class="hint" v-if="field.hint">
          {{ field.hint }}
        </div> -->
        <!-- <div class="errors" v-if="fieldErrors(field).length &gt; 0">
          <span v-for="(error, index) in fieldErrors(field)" track-by="index">
            {{ error }}
          </span>
        </div> -->
      </div>

    <!-- </div> -->

  </div>
</template>

<script>

// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  // import fieldsMixin from './fieldsMixin.js'

  import DropBox from './DropBox.vue'
  // import 'keen-ui/dist/keen-ui.min.css'
  // import 'flexboxgrid/dist/flexboxgrid.min.css'

	import {each, isFunction, isNil, isArray, isString} from "lodash";
  import Vue from 'vue';

  // import KeenUI from 'keen-ui';
  // Vue.use(KeenUI);

	export default {

    // mixins: [fieldsMixin],

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

        activeName: 'first',
        selectedOptions: [],
				errors: [], // Validation errors

        select1: '',
        select2: 'Number',
        fieldNames: [
          "Text",
          "Number",
          "Checkbox"
        ]
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
