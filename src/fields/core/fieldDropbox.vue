<template lang="html">
  <div class="wrapper">
    <p class="control">
      <span class="select">
        <select v-model="value" >
          <option
              v-for="item in items"
              :selected="getItemIsChecked(item)"
              :disabled="disabled"
              :value="getItemName(item)" >
            {{ getItemName(item) }}
          </option>
        </select>
      </span>
    </p>

    <!-- <div class="listbox form-control" v-if="schema.listBox" :disabled="disabled">
      <div class="list-row" v-for="item in items">
        <label>
          <input type="checkbox"
              :checked="getItemIsChecked(item)"
              :disabled="disabled"
              @change="onChanged($event, item)" />

          {{ getItemName(item) }}
        </label>
      </div>
    </div> -->

  </div>
</template>

<script>
	import {isObject, isNil} from "lodash";
	import abstractField from "../abstractField";

	export default {
		mixins: [ abstractField ],

		data() {
			return {
				comboExpanded: false
			};
		},

		computed: {
			items() {
				let values = this.schema.values;
				if (typeof(values) == "function") {
					return values.apply(this, [this.model, this.schema]);
				} else
					return values;
			},

			selectedCount() {
				if (this.value)
					return this.value.length;

				return 0;
			}
		},

		methods: {
			getItemID(item) {
				if (isObject(item) && item.id)
					return item.id;

				return item;
			},

			getItemName(item) {
				if (isObject(item) && item.name)
					return item.name;

				return item;
			},

			getItemIsChecked(item) {
				return (this.value && this.value.indexOf(this.getItemID(item)) != -1);
			},

			onChanged(event, item) {
        console.log("dropbox: ", event, item);
				if (isNil(this.value))
					this.value = [];

				if (event.target.checked)
					this.value.push(this.getItemID(item));
				else {
					this.value.splice(this.value.indexOf(this.getItemID(item)), 1);
				}
			},

			onExpandCombo() {
				this.comboExpanded = !this.comboExpanded;
			}
		}
	};
</script>


<style lang="scss">
	.vue-form-generator .field-checklist {

		.listbox, .dropList {
			height: auto;
			max-height: 150px;
			overflow: auto;

			.list-row {
				label {
					font-weight: initial;
				}

				input {
					margin-right: 0.3em;
				}
			}
		}

		.combobox {
			height: initial;
			overflow: hidden;

			.mainRow {
				cursor: pointer;
				position: relative;
				padding-right: 10px;

				.arrow {
					position: absolute;
					right: -9px;
					top: 3px;
					width: 16px;
					height: 16px;

					transform: rotate(0deg);
					transition: transform 0.5s;

					background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGdJREFUOI3tzjsOwjAURNGDUqSgTxU5K2AVrJtswjUsgHSR0qdxAZZFPrS+3ZvRzBsqf9MUtBtazJk+oMe0VTriiZCFX8nbpENMgfARjsn74vKj5IFruhfc8d6zIF9S/Hyk5HS4spMVeFcOjszaOwMAAAAASUVORK5CYII=');
					background-repeat: no-repeat;

				}

				&.expanded {
					.arrow {
						transform: rotate(-180deg);
					}
				}
			}

			.dropList {
				transition: height 0.5s;
				//margin-top: 0.5em;
			}
		}
	}
</style>
