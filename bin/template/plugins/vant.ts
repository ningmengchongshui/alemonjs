import { defineNuxtPlugin } from 'nuxt/app'
import {
  Icon,
  Field,
  Collapse,
  Cell,
  CellGroup,
  Button,
  Dialog,
  CollapseItem
} from 'vant'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp
    .use(Icon)
    .use(Cell)
    .use(CellGroup)
    .use(Button)
    .use(Field)
    .use(Dialog)
    .use(Collapse)
    .use(CollapseItem)
})
