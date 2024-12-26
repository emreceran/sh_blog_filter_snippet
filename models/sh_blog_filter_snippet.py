# -*- coding: utf-8 -*-
# Part of Softhealer Technologies.

from odoo import models, fields


class Slider(models.Model):
    _name = "sh.blog.filter.snippet"
    _description = "Slider"

    name = fields.Char(string="Name", required=True)

    filter_type = fields.Selection([
        ('domain', 'Domain'),
        ('manual', 'Manually')
    ], default="manual", string="Filter Type", required=True)

    tab_blog_post_line = fields.One2many(
        comodel_name="sh.blog.filter.snippet.tab.blog.post.line",
        inverse_name="slider_id", string="Blog Post Tabs")

    is_show_tab = fields.Boolean(string="Show Tabs?", default=True)
    is_show_slider = fields.Boolean(string="Show Slider?", default=False)

    #OWL OPTIONS
    items = fields.Integer(string='Items Per Slide', required=True, default=4)
    autoplay = fields.Boolean(string="Automatic Slide?", default=True)
    speed = fields.Integer(string="Slide Speed", default=300)
    loop = fields.Boolean(string="Loop Slide?", default=True)
    nav = fields.Boolean(string="Show Navigation Buttons?", default=True)

