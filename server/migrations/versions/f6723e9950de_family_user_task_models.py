"""Family User Task models

Revision ID: f6723e9950de
Revises: aefb6c9bd29a
Create Date: 2023-09-27 00:34:54.963708

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f6723e9950de'
down_revision = 'aefb6c9bd29a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('points', sa.Integer(), nullable=True),
    sa.Column('frequency', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('family_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['family_id'], ['families.id'], name=op.f('fk_tasks_family_id_families')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_tasks_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###
