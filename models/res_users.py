from odoo import models, fields
from odoo.tools.translate import html_translate


class CustomResUsers(models.Model):
    _inherit = 'res.users'

    profilePage = fields.Char(string="Profil", default="abd")
    linkedin = fields.Char(string="Linkedin", default="-")
