import numpy as np
import matplotlib.pyplot as plt
from euler import euler
from improved import improved_euler
from rungekutta import rungekutta
from scipy.integrate import odeint
from models import SIR, SIRS, SEIR

# create SIR model
beta = 0.6
gamma = 0.3
init = np.array([1200, 1, 0])
model = SIR(beta, gamma, init.sum())

# step size 0.1
h = 0.1

# evaluate t between t_min and t_max
t_min, t_max = 0, 200
t = np.linspace(t_min, t_max, num=int((t_max-t_min)/h))

# solve the ODE
out = odeint(model.interact, init, t).T
S, I, R = out

plt.plot(t, S, color='blue')
plt.plot(t, I, color='red')
plt.plot(t, R, color='green')
plt.show()