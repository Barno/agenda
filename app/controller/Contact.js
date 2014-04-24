Ext.define('Agenda.controller.Contact', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainPanel: 'main',
            contactForm: 'contactform',
            insertContactBtn: 'button[name=insertContact]',
            deleteContactBtn: 'button[name=deleteContact]',
            updateContactBtn: 'button[name=updateContact]',
            buttonContainer: 'container[name=buttonContainer]'
        },
        control: {
            insertContactBtn: {
                tap: 'addContact'
            },
            deleteContactBtn: {
                tap: 'deleteContact'
            },
            updateContactBtn: {
                tap: 'updateContact'
            }
        }
    },

    addContact: function (btn) {
        var me = this,
            form = me.getContactForm(),
            store = Ext.getStore('contactList');

        store.add(form.getValues());

        me._resetContactForm();
    },

    deleteContact: function (btn) {
        var me = this;

        Ext.Msg.confirm('Confirm', 'Are you sure to delete this contact?', function (buttonId) {
                if (buttonId === 'yes') {
                    var form = me.getContactForm();

                    Ext.getStore('contactList').remove(form.getRecord());
                    me._resetContactForm();
                }
            }
        );
    },

    updateContact: function (btn) {
        var me = this,
            form = me.getContactForm(),
            store = Ext.getStore('contactList'),
            record = store.getById(form.getRecord().getId());

        store.remove(record);
        store.add(form.getValues());

        me._resetContactForm();
    },

    _resetContactForm: function () {
        var me = this;

        me.getMainPanel().setActiveItem(0);
        me.getContactForm().reset();
        me.getButtonContainer().hide();
        me.getInsertContactBtn().show();
    }
});