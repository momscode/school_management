frappe.ui.form.on('Purchase Order',{
    validate:function(frm)
    {
        var count=0
        $.each(frm.doc.items || [], function(i, v) {
            if(v.uom=='Nos')
            {
                frappe.call({
                    method: 'frappe.client.get_value',
                    async: false,
                    args: {
                        'doctype': 'Bin',
                        'filters': {'item_code':v.item_code},
                        'fieldname': [
                             'actual_qty'
                         ]
                },
                callback : function(r,k) {
                    if(r.message.actual_qty>50)
                    {
                        //frappe.throw(__('This is an Error Message'))
                        count=count+1
                    }
                }
            })
            
            }
            
        });
        if(count>0)
            {
                frappe.throw(__('This is an Error Message'))
                frappe.validate=false;
            }
    }
})