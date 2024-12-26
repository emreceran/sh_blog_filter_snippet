# -*- coding: utf-8 -*-
# Part of Softhealer Technologies.
{
    'name': 'Dynamic Blog Snippets',
    'author': 'Softhealer Technologies',
    'website': 'https://www.softhealer.com',
    'support': 'support@softhealer.com',
    'category': 'Website',
    'summary': 'Website Dynamic Blog Slider Blog Blocks Blog Slider Snippets Module Blog Snippets App Blog Slider Blocks Snippet Blog Slider Horizontal Blog Slider Vertical Blog Slider Category Slider Snippets User-Defined Slider Odoo Blogs dynamic snippet Blog Snippet Website Blogs Dynamic Blog Snippets Snippets For Dynamic Blog Customizable Dynamic Blog Snippets Dynamic Blog Snippets template integration Dynamic Blog Snippets Features best plugin for dynamic blog how to implement dynamic blog snippets ',
    'description': '''
Do you want to create a 'Dynamic blog Snippets'?
Do you want to make a user-define filter for slider?
You can filter blogs by domain or manually.
You can make a dynamic domain also.
We provide 5 different snippet style for blog slider.
You can select manually blog for each tab or
you can set a limit in each tab.
You can configure 'Show Tabs' as per requirements. cheers!
Dynamic Blog Snippets Odoo, Advance Blog Slider Odoo
Website Dynamic Blog Slider, Blog Slider Snippets Module,
Blog Snippets, Blog Slider Blocks, Snippet Blog Slider,
Horizontal Blog Slider, Vertical Blog Slider,
Category Slider Snippets, User-Defined Slider Odoo
Website Dynamic Blog Slider, Blog Blocks,
Blog Slider Snippets Module, Blog Snippets App,
Blog Slider Blocks, Snippet Blog Slider, Horizontal Blog Slider,
Vertical Blog Slider, Category Slider Snippets, User-Defined Slider Odoo
''',
    'version': '0.0.1',
    'depends': [
        'website_blog',
        'sh_snippet_adv',
    ],
    'application': True,
    'data': [
        'security/ir.model.access.csv',
        'views/sh_blog_filter_snippet_views.xml',
        'views/blog_snippet_item_views.xml',
        'views/blog_snippet_views.xml',
        'views/website_snippet_option.xml',
        'views/wesbite_templates.xml',
    ],
    'assets': {
         'web.assets_frontend': [
            'sh_blog_filter_snippet/static/src/scss/sh_blog_filter_snippet.scss',
            'sh_blog_filter_snippet/static/src/js/sh_blog_filter_snippet.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
        ],
     },

    'images': ['static/description/background.png', ],
    'auto_install': False,
    'installable': True,
    'license': 'OPL-1',
    'price': 50,
    'currency': 'EUR',
}
