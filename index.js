const app1 = new Vue({
    el: '#app-1',
    data: {
        message: 'Hello Vue!'
    }
});

// htmlタグの方でディレクティブv-bind:{attributeName}
// を使って任意の属性に対して値を設定できる
const app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Hover your mouse over me for a few seconds to see my dynamically bound title!',
        titleMessage: 'You Loaded this page on ' + new Date().toLocaleString(),
        message2: ':title="titleMessage2"のように省略できます',
        titleMessage2: '省略したtitle',
    }
});

// 条件に一致した場合に表示する
const app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true,
        notSeen: false,
        transition: false,  // v-ifでは初期表示時に何もしない。その代わり切り替え時に毎回描画処理を行うためコストが高い
        transitionShow: true,   // v-showは初期表示時に常に描画され、CSSベースの切替を行う
    }
});

// リストをループするv-forディレクティブ
const app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' },
        ],
        object: {
            name1: 'value1',
            name2: 'value2',
            name3: 'value3',
        }
    },
    methods: {
        addListItem: function (param) {  // リストに新しい要素を追加する
            this.todos.push({ text: 'Add New Item ' + param });
        }
    }
});

// イベントリスナ
const app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!',
    },
    methods: {
        reverseMessage: function () {
            // 文字列を逆の順番にする
            this.message = this.message.split('').reverse().join('');
        }
    }
});


// 双方向バインディングv-modelディレクティブ
const app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
});



// コンポーネント
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
});
const app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' },
        ]
    }
});

// slot
Vue.component('base-layout', {
    template: '' +
    '<div class="container">' +
    '  <header>' +
    '    <slot name="header"></slot>' +
    '  </header>' +
    '  <main>' +
    // name="default"は省略できる
    // '    <slot></slot>' +
    '    <slot name="default"></slot>' +
     '</main>' +
     '  <footer>' +
    '    <slot name="footer"></slot>' +
    '  </footer>' +
    '</div>'
});
const appSlot = new Vue({
    el: '#app-slot',
    data: {
        header: { text: 'Here might be a page title'},
        main: [{ text: 'A paragraph for the main content.'}, { text: 'And another one.'}],
        footer: { text: 'Here\'s some contact info'},
    }
});


// $emit
// HTMLの属性になるためキャメルケースはNG
// <button v-on:click="$emit('myCustomevent')">
Vue.component('emit-button1', {
    template: `
    <button v-on:click="$emit('my-custom-event')">
      Click me to be myCustomEvent
    </button>
    `
});
const appEmit1 = new Vue({
    el: '#app-emit1',
    methods: {
        onCustomEvent: function () {
            alert('No parameter Custom Event');
        }
    }
});

Vue.component('emit-button2', {
    methods: {
        myOnClick: function () {
            this.$emit('my-custom-event-param', 'This is component param');
        }
    },
    template: `
    <button v-on:click="myOnClick">
      Click me to be myCustomEvent
    </button>
    `
});
const appEmit2 = new Vue({
    el: '#app-emit2',
    methods: {
        onCustomEvent: function (param) {
            alert(param);
        }
    }
});

// 動的Component
Vue.component('tab-1', {
    template: `
    <p>This is Tab1 component</p>
    `
});
Vue.component('tab-2', {
    template: `
    <p>This is Tab2 component</p>
    `
});
Vue.component('tab-3', {
    template: `
    <p>This is Tab3 component</p>
    `
});
const CONST_COMP_IDS = { TAB1: 'tab-1', TAB2: 'tab-2', TAB3: 'tab-3' };
const comp = new Vue({
    el: '#app-comp',
    data: {
        CONST_COMP_IDS: CONST_COMP_IDS,
        componentId: CONST_COMP_IDS.TAB1,
    }
});

// 次のサンプルでVueインスタンスのライフサイクルがわかります。
// beforeCreateから始まって上から順に呼ばれていきます
const appLifeCycle = new Vue({
    el: '#app-life-cycle',
    data: {
        a: 'init',
        b: undefined,
        buttonLabel: 'destroy'
    },
    methods: {
        doDestory: function () {
            console.info('doDestory call');
            this.buttonLabel = 'destroyed';
            // 変更したbuttonLabelの値を描画したらdestroyを呼び出す
            this.$nextTick(function () {
                // NOTE: beforeUpdate, updatedが先に呼ばれます
                console.info('nextTick call');
                this.$destroy();
            });
        }
    },
    beforeCreate: function () {
        console.info('beforeCreate a:', this.a);
        this.a = 'next created';
    },
    created: function () {
        console.info('created a:', this.a);
        this.a = 'created';
    },
    beforeMount: function () {
        console.info('beforeMount a:', this.a);
        this.a = 'beforeMount';
    },
    mounted: function () {
        console.info('mounted a:', this.a);
        this.a = 'mount';
    },
    beforeUpdate: function () {
        console.info('beforeUpdate buttonLabel:', this.buttonLabel)
    },
    updated: function () {
        console.info('updated buttonLabel:', this.buttonLabel)
    },
    beforeDestroy: function () {
        console.info('beforeDestroy a:', this.a);
        this.a = 'beforeDestory';
    },
    destroyed: function () {
        console.info('destroyed a:', this.a);
    },
});

// 算出プロパティのサンプル
// itemsが更新されると1回だけ呼ばれ、2回目以降はキャッシュされた値を取得しているのがわかる
const appComputedVsMethods = new Vue({
    el: '#app-computed-vs-methods',
    data: {
        items: [],
    },
    methods: {
        addRandomItem: function () {
            this.items.push({ val: Math.floor(Math.random() * 10) });
        },
        getTotalCountMethod: function () {
            console.info('getTotalCountMethod call');
            return this.items.reduce((sum, item) => sum + item.val, 0);
        }
    },
    computed: {
        getTotalCount: function () {
            console.info('getTotalCount call');
            return this.items.reduce((sum, item) => sum + item.val, 0);
        }
    }
})
