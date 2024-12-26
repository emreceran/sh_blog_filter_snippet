# -*- coding: utf-8 -*-
# Part of Softhealer Technologies.

from odoo import models, fields, api, _

from odoo.exceptions import ValidationError

class SliderTabBlogPostLine(models.Model):
    _name = "sh.blog.filter.snippet.tab.blog.post.line"
    _description = "Blog Post Slider Tab"
    _order = "sequence, id"

    name = fields.Char(string="Tab Name", required=True,translate=True)
    blog_post_ids = fields.Many2many(
        comodel_name="blog.post", string="Blog Posts")
    filter_id = fields.Many2one(
        comodel_name="ir.filters", string="Filter", domain='[("model_id","=","blog.post" )]')
    slider_id = fields.Many2one('sh.blog.filter.snippet', string='Slider Reference',
                                required=True, ondelete='cascade', index=True, copy=False)
    sequence = fields.Integer('Display order')
    limit = fields.Integer(string="Limit")

    @api.onchange('limit')
    def _onchange_limit(self):
        if self.limit and self.limit < 0:
            raise ValidationError(_('Limit must not be negative.'))